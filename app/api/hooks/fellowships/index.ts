import { useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../queryKeys"
import { publicAxios } from "@/lib/Axios/public"
import { API_URL } from "../../url"
import { FellowshipProp } from "./types"

export const useGetFellowships = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.FELLOWSHIP.GET_FELLOWSHIPS],
        queryFn: async () => {
            const resp = await publicAxios.get<FellowshipProp[]>(API_URL.FELLOWSHIP.GET_FELLOWSHIPS)
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