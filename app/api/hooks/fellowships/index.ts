import { useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../queryKeys"
import { API_URL } from "../../url"
import { FellowshipProp } from "./types"
import securedAxios from "@/lib/Axios/secured"

export const useGetFellowships = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.FELLOWSHIP.GET_FELLOWSHIPS],
        queryFn: async () => {
            const resp = await securedAxios.get<FellowshipProp[]>(API_URL.FELLOWSHIP.GET_FELLOWSHIPS)
            return resp.data
        }
    })
}

export const useJoinFellowship = () => {
    return useMutation({
        mutationKey: [],
        mutationFn: async () => {

        }
    })
}

export const useLeaveFellowship = () => {
    return useMutation({
        mutationKey: [],
        mutationFn: async () => {

        }
    })
}