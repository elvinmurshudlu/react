import { type IFormComponent } from "@/shared/FormBuilder/type"
import { DatePicker, type DatePickerProps } from "antd"
import ComponentWrapper from "@/shared/FormBuilder/ComponentWrapper/InputWrapper"
import { Controller, useFormContext } from "react-hook-form"
import dayjs from "dayjs"
import {
    default_time_format,
    showFormat,
} from "@/shared/FormBuilder/components/Date/format"

type FormDatePickerProps = IFormComponent & DatePickerProps

function FormDatePicker({
    className,
    label,
    fieldName,
    dependOn,
    showOn,
    ...props
}: FormDatePickerProps) {
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
                        <DatePicker
                            status={error && "error"}
                            placeholder={label}
                            format={
                                (props.format as string) ??
                                showFormat
                            }
                            style={{ width: "100%" }}
                            value={
                                field.value
                                    ? dayjs(
                                          field.value,
                                          (props.format as string) ??
                                              default_time_format,
                                      )
                                    : undefined
                            }
                            {...props}
                            id={fieldName}
                            onChange={(date) =>
                                date && !Array.isArray(date)
                                    ? field.onChange(
                                          dayjs(date)
                                              .format(
                                                  (props.format as string) ??
                                                      default_time_format,
                                              )
                                              .toString(),
                                      )
                                    : field.onChange(
                                          undefined,
                                      )
                            }
                        ></DatePicker>
                    )
                }}
                name={fieldName}
                control={control}
            />
        </ComponentWrapper>
    )
}

export default FormDatePicker
