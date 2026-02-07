
import requestController from "@/lib/requestController";
import { QueryClient, useQuery } from "@tanstack/react-query"

const _client = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            staleTime: 1000 * 60 * 10,
            gcTime: 1000 * 60 * 15,
        },
    },
});


const getQueryDataSetter = <State extends object, Slice extends string>(slice: Slice) => {
    return (data: Partial<State>) => {
        Object.entries(data).forEach(([key, value]) => {
            if (value === undefined) value = null
            _client.setQueryData([slice, key], value)
        })
    }
}

const getQueryDataGetter = <State extends object>(slice: string) => {
    return () => {
        const data = _client.getQueriesData({ queryKey: [slice] })

        const state: Record<string, unknown> = {}

        data.forEach((next) => {
            const key = next[0][1] as string
            state[key] = next[1]
        })

        return state as State
    }
}

export const client = {
    get: () => _client,
    setter: getQueryDataSetter,
    getter: getQueryDataGetter,
}

// ================================================
// THIS IS AN EXTENSION OF THE QUERY-CLIENT LIBRARY
// TO PROVIDE TYPE-SAFE GLOBAL ACCESS TO ANY PIECE OF THE STATE
// ================================================

// ======================================
// GLOBAL QUERY-CLIENT ACCESSOR FUNCTIONS
// ======================================

// Register the slice of the state with unique name
type GlobalState = {
    name: unknown
}

export const getQueryKey = <Slice extends keyof GlobalState, Key extends keyof GlobalState[Slice]>(
    slice: Slice,
    key: Key,
): [Slice, Key] => {
    return [slice, key]
}

export const setQueryData = <Slice extends keyof GlobalState, Key extends keyof GlobalState[Slice]>(
    slice: Slice,
    key: Key,
    data: GlobalState[Slice][Key],
    options?: SetQueryOptions,
) => {
    data ??= null as unknown as GlobalState[Slice][Key];

    if (options?.delay) {
        const set = () => _client.setQueryData<GlobalState[Slice][Key]>(getQueryKey(slice, key), data)
        const ID = `${slice}-${String(key)}`
        requestController.debounce(ID, set, options.delay)
    } else {
        _client.setQueryData<GlobalState[Slice][Key]>(getQueryKey(slice, key), data)
    }
}

export const getQueryData = <Slice extends keyof GlobalState, Key extends keyof GlobalState[Slice]>(slice: Slice, key: Key) => {
    return _client.getQueryData<GlobalState[Slice][Key]>(getQueryKey(slice, key))
}

export const deleteQueryData = <Slice extends keyof GlobalState, Key extends keyof GlobalState[Slice]>(slice: Slice, key: Key) => {
    _client.setQueryData<GlobalState[Slice][Key]>(getQueryKey(slice, key), null as unknown as GlobalState[Slice][Key])
}

export const removeQuery = <Slice extends keyof GlobalState, Key extends keyof GlobalState[Slice]>(slice: Slice, key: Key) => {
    _client.removeQueries({ queryKey: getQueryKey(slice, key) })
}

type SetQueryOptions = {
    /**
     * @param delay in milliseconds
     */
    delay?: number
}

// =================================
// GLOBAL QUERY-CLIENT SELECTOR HOOK
// =================================

export const useTypedQuery = <Slice extends keyof GlobalState, Key extends keyof GlobalState[Slice]>(slice: Slice, key: Key) => {
    const result = useQuery<GlobalState[Slice][Key]>({ queryKey: getQueryKey(slice, key), enabled: false })
    return result
}

// ==================================================
// SPECIFIC QUERY-CLIENT ACCESSOR GENERATOR FUNCTIONS
// ==================================================

export const getTypedSelector = <State>(getKey: <Key extends keyof State>(key: Key) => [string, Key]) => {
    return <Key extends keyof State>(key: Key) => {
        const result = useQuery<State[Key]>({ queryKey: getKey(key), enabled: false })
        return result
    }
}

export const queryKeyGetter = <Slice extends string, State>(slice: Slice) => {
    return <Key extends keyof State>(key: Key): [Slice, Key] => [slice, key]
}

type KeyGetter<Slice extends string, State> = ReturnType<typeof queryKeyGetter<Slice, State>>

export const querySetter = <Slice extends string, State>(keyGetter: KeyGetter<Slice, State>) => {
    return <Key extends keyof State>(key: Key, data: State[Key]) => {
        data ??= null as unknown as State[Key];

        _client.setQueryData<State[Key]>(keyGetter(key), data)
    }
}

export const queryDetecter = <Slice extends string, State>(keyGetter: KeyGetter<Slice, State>) => {
    return <Key extends keyof State>(key: Key) => {
        _client.setQueryData<State[Key]>(keyGetter(key), null as unknown as State[Key])
    }
}

export const queryGetter = <Slice extends string, State>(keyGetter: KeyGetter<Slice, State>) => {
    return <Key extends keyof State>(key: Key) => {
        return _client.getQueryData<State[Key]>(keyGetter(key))
    }
}

export const queryRemover = <Slice extends string, State>(keyGetter: KeyGetter<Slice, State>) => {
    return <Key extends keyof State>(key: Key) => {
        _client.removeQueries({ queryKey: keyGetter(key) })
    }
}
