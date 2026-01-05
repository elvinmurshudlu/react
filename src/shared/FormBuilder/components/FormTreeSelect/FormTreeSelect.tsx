import { type IFormComponent } from "@/shared/FormBuilder/type"
import { TreeSelect, type TreeSelectProps } from "antd"
import ComponentWrapper from "@/shared/FormBuilder/ComponentWrapper/InputWrapper"
import { Controller, useFormContext } from "react-hook-form"
import clsx from "clsx"

type FormTreeSelectProps = IFormComponent & TreeSelectProps

function FormTreeSelect({
    className,
    label,
    fieldName,
    dependOn,
    classNames,
    showOn,
    ...inputProps
}: FormTreeSelectProps) {
    const { control } = useFormContext()

    return (
        <ComponentWrapper
            dependOn={dependOn}
            label={label}
            fieldName={fieldName}
            className={className}
            showOn={showOn}
        >
            <Controller
                render={({
                    field,
                    fieldState: { error },
                }) => {
                    return (
                        <TreeSelect
                            className={clsx(
                                classNames,
                                "w-full",
                            )}
                            id={fieldName}
                            {...field}
                            status={error && "error"}
                            allowClear={true}
                            {...inputProps}
                        />
                    )
                }}
                name={fieldName}
                control={control}
            />
        </ComponentWrapper>
    )
}

export default FormTreeSelect
