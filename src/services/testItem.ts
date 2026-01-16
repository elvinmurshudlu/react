import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query"
import { axiosClient } from "@/core/interceptor/interceptor.ts"
import { api_urls } from "@/core/url/api_url.ts"
import type { ITest } from "@/types/testType.ts"

const testItemKey = "testItemKey"

export function useGetTestItemList(username: string) {
    const name = username.name
    return useQuery({
        queryFn: () =>
            axiosClient.get(api_urls.testItemList),
        queryKey: [testItemKey],
    })
}

export function useGetTestItemById(id: number) {
    return useQuery({
        queryFn: () =>
            axiosClient.get<ITest>(
                api_urls.testItemById(id),
            ),
        queryKey: [testItemKey, id],
    })
}

export function useDeleteTestItemById() {
    const client = useQueryClient()

    return useMutation({
        mutationFn: (itemId: number) =>
            axiosClient.delete(
                api_urls.testItemById(itemId),
            ),
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: [testItemKey],
            })
        },
    })
}

export function useCreateTestItem() {
    const client = useQueryClient()
    return useMutation({
        mutationFn: (values: unknown) =>
            axiosClient.post(api_urls.testItemList, values),
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: [testItemKey],
            })
        },
    })
}
