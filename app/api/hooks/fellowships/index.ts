import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetFellowships = () => {
    return useQuery({
        queryKey: [],
        queryFn: async () => {

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