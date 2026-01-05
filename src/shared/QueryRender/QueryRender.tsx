import type { UseQueryResult } from "@tanstack/react-query"
import { type ReactNode } from "react"

type QueryRenderProps<T> = {
    query: UseQueryResult<T>
    loadingElement?: ReactNode
    emptyElement?: ReactNode
    render: (data: T) => ReactNode
}

function QueryRender<T>({
    query,
    loadingElement,
    emptyElement,
    render,
}: QueryRenderProps<T>) {
    if (query.isFetching)
        return loadingElement || <div>Loading...</div>

    if (!query.data) return emptyElement || <div>Empty</div>

    return <>{render(query.data)}</>
}

export default QueryRender
