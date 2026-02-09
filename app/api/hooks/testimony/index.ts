import { useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../queryKeys"
import { publicAxios } from "@/lib/Axios/public"
import { API_URL } from "../../url"
import { QueryParams, TestimoniesResponse, Testimony, TestimonyPayload } from "./types"
import { sanitizeParams } from "@/utils/sanitizeParams"
import securedAxios from "@/lib/Axios/secured"
import { client } from "@/app/queryClient"

export const useGetTestimoniesFeed = (params: QueryParams) => {
    return useQuery({
        queryKey: [QUERY_KEYS.TESTIMONY.GET_TESTIMONY_FEED],
        queryFn: async () => {
            const resp = await publicAxios.get<TestimoniesResponse>(API_URL.TESTIMONY.GET_TESTIMONY_FEED, { params: sanitizeParams(params) })
            return resp.data
        }
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
            const resp = await securedAxios.post(API_URL.TESTIMONY.CREATE_TESTIMONY, params)
            return resp
        },
        onSuccess: () => {
            client.get().invalidateQueries({ queryKey: [] })
        }
    })
}

export const useDeleteTestimony = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.TESTIMONY.DELETE_TESTIMONY],
        mutationFn: async () => {

        }
    })
}

