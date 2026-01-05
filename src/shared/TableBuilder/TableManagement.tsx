import { Button, Popconfirm } from "antd"
import {
    DeleteOutlined,
    EditOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons"
import type { ReactNode } from "react"

interface ExtraButtonProps<T> {
    onClick: (id: number, record: T) => void
    allowClick?: boolean
    icon: ReactNode
}

export interface ITableManagement<T> {
    onEdit?: (id: number | string, record: T) => void
    onDelete?: (id: number | string, record: T) => void
    allowDelete?: (
        id: number | string,
        record: T,
    ) => boolean
    allowEdit?: (id: number | string, record: T) => boolean

    extraButtons?: ({
        row,
    }: {
        row: T
    }) => ExtraButtonProps<T>[]
}

interface ITableManagementProps<
    T,
> extends ITableManagement<T> {
    value: number
    record: T
}

function TableManagement<T>({
    allowEdit,
    allowDelete,
    onEdit,
    onDelete,
    value,
    record,
    extraButtons,
}: ITableManagementProps<T>) {
    return (
        <div className={"flex w-full justify-end gap-2"}>
            {extraButtons && (
                <>
                    {extraButtons({ row: record }).map(
                        (
                            { onClick, allowClick, icon },
                            i,
                        ) => (
                            <Button
                                key={i}
                                disabled={
                                    allowClick ?? true
                                }
                                type={"text"}
                                onClick={() =>
                                    onClick(value, record)
                                }
                                icon={icon}
                            ></Button>
                        ),
                    )}
                </>
            )}

            {onEdit && ( //bu hissəyə aşağı buttondakı disable şərti verildikdə render etməmək üçündür indiki halda isə əgər icazə olmasa sadəcə disable olacaq
                <>
                    <Button
                        disabled={
                            !(allowEdit
                                ? allowEdit(value, record)
                                : true)
                        }
                        type={"text"}
                        onClick={() =>
                            onEdit(value, record)
                        }
                        icon={<EditOutlined />}
                    ></Button>
                </>
            )}

            {onDelete && (
                <>
                    <Popconfirm
                        title="Silinsin?"
                        description="Bu əməliyyat geri qaytarılmır."
                        onConfirm={() =>
                            onDelete(value, record)
                        }
                        icon={
                            <QuestionCircleOutlined
                                style={{ color: "red" }}
                            />
                        }
                        okText="Bəli"
                        cancelText="Xeyr"
                    >
                        <Button
                            disabled={
                                !(allowDelete
                                    ? allowDelete(
                                          value,
                                          record,
                                      )
                                    : true)
                            }
                            danger={true}
                            type={"text"}
                            icon={<DeleteOutlined />}
                        ></Button>
                    </Popconfirm>
                </>
            )}
        </div>
    )
}

export default TableManagement
