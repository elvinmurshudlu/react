import { type IFormComponent } from "@/components/FormBuilder/type"
import { Select, type SelectProps } from "antd"
import ComponentWrapper from "@/components/FormBuilder/ComponentWrapper/InputWrapper"
import { Controller, useFormContext } from "react-hook-form"
import clsx from "clsx"

type FormSelectProps = IFormComponent & SelectProps

function FormSelect({
    className,
    label,
    fieldName,
    dependOn,
    classNames,
    showOn,
    ...inputProps
}: FormSelectProps) {
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
                        <Select
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

export default FormSelect
