import { useQuery } from "@tanstack/react-query"

export const useGetAllTopics = () => {
    return useQuery({
        queryKey: [],
        queryFn: async () => {

        }
    })
}