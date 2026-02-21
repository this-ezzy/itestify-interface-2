import { publicAxios } from "@/lib/Axios/public"
import { useQuery } from "@tanstack/react-query"
import { API_URL } from "../../url"
import { TopicData } from "./types"

export const useGetAllTopics = () => {
    return useQuery({
        queryKey: [],
        queryFn: async () => {
            const result = await publicAxios.get<TopicData[]>(API_URL.TOPIC.GET_ALL_TOPIS)
            return result.data
        }
    })
}