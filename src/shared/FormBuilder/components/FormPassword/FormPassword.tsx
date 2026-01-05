import { type IFormComponent } from "@/shared/FormBuilder/type"
import { Input, type InputProps } from "antd"
import ComponentWrapper from "@/shared/FormBuilder/ComponentWrapper/InputWrapper"
import { Controller, useFormContext } from "react-hook-form"

type FormInputProps = IFormComponent & InputProps

function FormPassword({
    className,
    label,
    fieldName,
    dependOn,
    showOn,
    ...inputProps
}: FormInputProps) {
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
                        <Input.Password
                            status={error && "error"}
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

export default FormPassword
