import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../queryKeys"
import { publicAxios } from "@/lib/Axios/public"
import { API_URL } from "../../url"
import { QueryParams, TestimoniesResponse, Testimony, TestimonyPayload } from "./types"
import { sanitizeParams } from "@/utils/sanitizeParams"
import securedAxios from "@/lib/Axios/secured"
import { client } from "@/app/queryClient"


export const useGetTestimoniesFeed = (params: QueryParams) => {
    return useInfiniteQuery({
        queryKey: [
            QUERY_KEYS.TESTIMONY.GET_TESTIMONY_FEED,
            sanitizeParams(params), // ensures cache separation per filter set
        ],

        initialPageParam: 1,

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
            /**
             * Adjust this logic depending on your API shape.
             * Common patterns:
             *
             * 1. If API returns:
             *    { data: [], meta: { currentPage, totalPages } }
             *
             * 2. If API returns:
             *    { data: [], nextPage: number | null }
             */

            const currentPage = lastPage?.page
            const hasNextPage = lastPage.hasNext

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
            formData.append("title", params.title)
            formData.append("body", params.body)
            formData.append("isDraft", String(params.isDraft))
            if (params.topic !== undefined) formData.append("topic", String(params.topic))
            if (params.scheduledAt) formData.append("scheduledAt", params.scheduledAt)

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
        },
    })
}