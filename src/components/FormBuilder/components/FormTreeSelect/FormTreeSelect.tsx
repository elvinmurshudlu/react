import { type IFormComponent } from "@/components/FormBuilder/type"
import { TreeSelect, type TreeSelectProps } from "antd"
import ComponentWrapper from "@/components/FormBuilder/ComponentWrapper/InputWrapper"
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
                render={({ field }) => {
                    return (
                        <TreeSelect
                            className={clsx(
                                classNames,
                                "w-full",
                            )}
                            id={fieldName}
                            {...field}
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
