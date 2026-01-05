import { Pagination, Table, type TableProps } from "antd"
import { useMemo } from "react"
import type { ColumnsType } from "antd/es/table"
import TableManagement, {
    type ITableManagement,
} from "./TableManagement.tsx"
import type { AnyObject } from "antd/es/_util/type"
import type { ColumnType } from "antd/es/table"
import { usePage } from "@/core/hook/usePage.ts"

const tableOrder = <
    T extends AnyObject,
>(): ColumnType<T> => ({
    key: "order",
    dataIndex: "id",
    title: "№",
    width: 50,
    render: (_text, _record, index) => index + 1,
})

interface TableBuilderProps<
    T extends AnyObject,
> extends TableProps<T> {
    totalRecords?: number
    tableManagement?: ITableManagement<T>
}

export interface ICustomTableProps<T> {
    record: T[]
    totalRecord?: number
    loading: boolean
}

function TableBuilder<T extends AnyObject>({
    columns = [],
    ...props
}: TableBuilderProps<T>) {
    const { pageNumber, pageSize, changePage } = usePage()

    const column_list: ColumnsType<T> = useMemo(() => {
        const curr: ColumnsType<T> = [
            tableOrder<T>(),
            ...columns,
        ]
        if (props.tableManagement) {
            curr.push({
                key: "table_management",
                title: "Əməliyyatlar",
                width: 100,
                dataIndex: "id",
                align: "end",
                render: (_value, record) => (
                    <TableManagement<T>
                        value={_value}
                        record={record}
                        {...props.tableManagement!}
                    />
                ),
            } as ColumnType<T>)
        }
        return curr
    }, [columns, props.tableManagement])

    return (
        <>
            <Table<T>
                pagination={false}
                columns={column_list}
                rowKey={"id"}
                rowClassName={(_, i) =>
                    i % 2 === 0 ? "even-row" : "odd-row"
                }
                {...props}
            />
            {props.totalRecords != 0 && (
                <Pagination
                    onChange={(pageNumber) => {
                        changePage(pageNumber)
                    }}
                    pageSize={pageSize}
                    current={pageNumber}
                    align={"end"}
                    total={props.totalRecords}
                />
            )}
        </>
    )
}
export default TableBuilder
