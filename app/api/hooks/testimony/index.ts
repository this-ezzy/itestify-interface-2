import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../queryKeys"
import { publicAxios } from "@/lib/Axios/public"
import { API_URL } from "../../url"
import { QueryParams, TestimoniesResponse, Testimony, TestimonyPayload } from "./types"
import { sanitizeParams } from "@/utils/sanitizeParams"
import securedAxios from "@/lib/Axios/secured"
import { client } from "@/app/queryClient"


export const useGetTestimoniesFeed = (params: QueryParams, options?: { enabled?: boolean }) => {
    return useInfiniteQuery({
        queryKey: [
            QUERY_KEYS.TESTIMONY.GET_TESTIMONY_FEED,
            sanitizeParams(params), // ensures cache separation per filter set
        ],

        initialPageParam: 1,
        enabled: options?.enabled ?? true,

        queryFn: async ({ pageParam }) => {
            const resp = await publicAxios.get<TestimoniesResponse>(
                API_URL.TESTIMONY.GET_TESTIMONY_FEED,
                {
                    params: sanitizeParams({
                        ...params,
                        page: pageParam,
                    }),
                }
            )

            return resp.data
        },

        getNextPageParam: (lastPage) => {
            const currentPage = lastPage?.page
            const hasNextPage = lastPage.next_page

            if (!currentPage || !hasNextPage) return undefined
            return hasNextPage
                ? currentPage + 1
                : undefined
        },
    })
}

export const useGetTestimonyDetails = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.TESTIMONY.GET_TESTIMONY_DETAILS],
        queryFn: async () => {
            const resp = await publicAxios.get<Testimony>(API_URL.TESTIMONY.GET_TESTIMONY_DETAILS(id))
            return resp.data
        }
    })
}

export const useGetTestimoniesByUser = (params: QueryParams) => {
    return useQuery({
        queryKey: [QUERY_KEYS.TESTIMONY.GET_TESTIMONY_BY_USER],
        queryFn: async () => {
            const resp = await publicAxios.get<TestimoniesResponse>(API_URL.TESTIMONY.GET_TESTIMONY_BY_USER, { params: sanitizeParams(params) })
            return resp.data
        }
    })
}

export const useCreateTestimony = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.TESTIMONY.GET_TESTIMONY_FEED],

        mutationFn: async (params: TestimonyPayload) => {
            const formData = new FormData()

            // append text fields
            formData.append("body", params.body)
            if (params.parent_id) formData.append("parent_id", params.parent_id)
            if (params.title) formData.append("title", params.title)
            if (params.isDraft) formData.append("is_draft", String(params.isDraft))
            if (params.topic !== undefined) formData.append("topic_id", String(params.topic))

            // append files exactly like Postman
            if (params.files?.length) {
                params.files.forEach((f) => {
                    // f.file must be the real File object
                    if (f.file instanceof File) {
                        // "file" is the field name Postman uses
                        formData.append("files", f.file, f.name)
                    }
                })
            }

            // send multipart/form-data
            const resp = await securedAxios.post(API_URL.TESTIMONY.CREATE_TESTIMONY, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })

            return resp.data
        },

        onSuccess: () => {
            client.get().invalidateQueries({ queryKey: [QUERY_KEYS.TESTIMONY.GET_TESTIMONY_FEED] })
            client.get().invalidateQueries({ queryKey: [QUERY_KEYS.TESTIMONY.GET_TESTIMONY_REPLY] })
        },
    })
}




export const useDeleteTestimony = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.TESTIMONY.DELETE_TESTIMONY],
        mutationFn: async () => {

        }
    })
}


export const useLikeTestimony = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.TESTIMONY.LIKE_TESTIMONY],
        mutationFn: async (id: string) => {
            const result = securedAxios.post(API_URL.TESTIMONY.LIKE_TESTIMONY(id))
            return result
        },
        onSuccess: () => {
            client.get().invalidateQueries({ queryKey: [QUERY_KEYS.TESTIMONY.GET_TESTIMONY_FEED] })
            client.get().invalidateQueries({ queryKey: [QUERY_KEYS.TOPIC.GET_TESTIMONIES_BY_TOPIC] })
            client.get().invalidateQueries({ queryKey: [QUERY_KEYS.TESTIMONY.SEARCH_TESTIMONIES] })
        },
    })
}

export const useDisLikeTestimony = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.TESTIMONY.UN_LIKE_TESTIMONY],
        mutationFn: async (id: string) => {
            const result = securedAxios.delete(API_URL.TESTIMONY.LIKE_TESTIMONY(id))
            return result
        },
        onSuccess: () => {
            client.get().invalidateQueries({ queryKey: [QUERY_KEYS.TESTIMONY.GET_TESTIMONY_FEED] })
            client.get().invalidateQueries({ queryKey: [QUERY_KEYS.TOPIC.GET_TESTIMONIES_BY_TOPIC] })
            client.get().invalidateQueries({ queryKey: [QUERY_KEYS.TESTIMONY.SEARCH_TESTIMONIES] })
        },
    })
}

export const useBookmarkTestimony = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.TESTIMONY.BOOKMARK_TESTIMONY],
        mutationFn: async (id: string) => {
            const result = securedAxios.post(API_URL.TESTIMONY.BOOKMARK_TESTIMONY(id))
            return result
        },
        onSuccess: () => {
            client.get().invalidateQueries({ queryKey: [QUERY_KEYS.TESTIMONY.GET_TESTIMONY_FEED] })
            client.get().invalidateQueries({ queryKey: [QUERY_KEYS.TOPIC.GET_TESTIMONIES_BY_TOPIC] })
            client.get().invalidateQueries({ queryKey: [QUERY_KEYS.TESTIMONY.SEARCH_TESTIMONIES] })
        },

    })
}

export const useRemoveBookmarkTestimony = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.TESTIMONY.UN_BOOKMARK_TESTIMONY],
        mutationFn: async (id: string) => {
            const result = securedAxios.delete(API_URL.TESTIMONY.BOOKMARK_TESTIMONY(id))
            return result
        },
        onSuccess: () => {
            client.get().invalidateQueries({ queryKey: [QUERY_KEYS.TESTIMONY.GET_TESTIMONY_FEED] })
            client.get().invalidateQueries({ queryKey: [QUERY_KEYS.TOPIC.GET_TESTIMONIES_BY_TOPIC] })
            client.get().invalidateQueries({ queryKey: [QUERY_KEYS.TESTIMONY.SEARCH_TESTIMONIES] })
        },
    })
}

export const useGetReplies = (params: QueryParams) => {
    return useInfiniteQuery({
        queryKey: [
            QUERY_KEYS.TESTIMONY.GET_TESTIMONY_REPLY,
            sanitizeParams(params), // ensures cache separation per filter set
        ],

        initialPageParam: 1,

        queryFn: async ({ pageParam }) => {
            const resp = await securedAxios.get<TestimoniesResponse>(
                API_URL.TESTIMONY.GET_REPLIES(params.id as string),
                {
                    params: sanitizeParams({
                        ...params,
                        page: pageParam,
                    }),
                }
            )

            return resp.data
        },

        getNextPageParam: (lastPage) => {
            const currentPage = lastPage?.page
            const hasNextPage = lastPage.next_page

            if (!currentPage || !hasNextPage) return undefined

            return hasNextPage
                ? currentPage + 1
                : undefined
        },
    })
}


export const useGetTestimoniesByTopics = (
    props: QueryParams,
    options?: { enabled?: boolean }
) => {
    const { id, ...params } = props
    return useInfiniteQuery({
        queryKey: [
            QUERY_KEYS.TOPIC.GET_TESTIMONIES_BY_TOPIC,
            sanitizeParams(props),
        ],

        enabled: options?.enabled ?? true,

        initialPageParam: 1,

        queryFn: async ({ pageParam }) => {
            const resp = await publicAxios.get<TestimoniesResponse>(
                API_URL.TESTIMONY.GET_TESTIMONIES_BY_TOPIC(id as string),
                {
                    params: sanitizeParams({
                        ...params,
                        page: pageParam,
                    }),
                }
            )

            return resp.data
        },

        getNextPageParam: (lastPage) => {
            const currentPage = lastPage?.page
            const nextPageExists = lastPage?.next_page

            if (!currentPage || !nextPageExists) return undefined

            return currentPage + 1
        },
    })
}

export const useSearchTestimonies = (
    params: QueryParams,
    options?: { enabled?: boolean }
) => {

    return useInfiniteQuery({
        queryKey: [
            QUERY_KEYS.TESTIMONY.SEARCH_TESTIMONIES,
            sanitizeParams(params),
        ],

        enabled: options?.enabled ?? true,

        initialPageParam: 1,

        queryFn: async ({ pageParam }) => {
            const resp = await publicAxios.get<TestimoniesResponse>(
                API_URL.TESTIMONY.SEARCH_TESTIMONIES,
                {
                    params: sanitizeParams({
                        ...params,
                        page: pageParam,
                    }),
                }
            )

            return resp.data
        },

        getNextPageParam: (lastPage) => {
            const currentPage = lastPage?.page
            const nextPageExists = lastPage?.next_page

            if (!currentPage || !nextPageExists) return undefined

            return currentPage + 1
        },
    })
}