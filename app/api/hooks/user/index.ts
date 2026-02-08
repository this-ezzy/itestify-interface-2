import { useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../queryKeys"
import securedAxios from "@/lib/Axios/secured"
import { API_URL } from "../../url"
import { AuthUser } from "../auth/types"

export const useGetProfile = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.USER.GET_PROFILE],
        queryFn: async () => {
            const resp = await securedAxios.get<{ data: AuthUser }>(API_URL.USER.PROFILE)
            return resp.data.data
        }
    })
}

export const useUpdateProfile = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.USER.UPDATE_PROFILE],
        mutationFn: async (params: Partial<AuthUser>) => {
            const resp = await securedAxios.put(API_URL.USER.PROFILE, params)
            return resp.data
        }
    })
}