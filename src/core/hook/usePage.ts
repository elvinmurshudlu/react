import { useSearchParams } from "react-router"
import { useCallback } from "react"

const default_page_size = 10
const default_page_number = 1

export function usePage() {
    const [searchParams, setSearchParams] =
        useSearchParams()
    const pageSize = parseInt(
        searchParams.get("pageSize") ??
            default_page_size.toString(),
    )
    const pageNumber = parseInt(
        searchParams.get("pageNumber") ??
            default_page_number.toString(),
    )

    const changePage = useCallback(
        (pageNum: number) => {
            searchParams.set(
                "pageNumber",
                pageNum.toString(),
            )
            setSearchParams(searchParams)
        },
        [searchParams, setSearchParams],
    )

    return { pageSize, pageNumber, changePage }
}
