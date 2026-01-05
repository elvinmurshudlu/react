import { type IFormRangeComponent } from "@/components/FormBuilder/type"
import { DatePicker } from "antd"
import ComponentWrapper from "@/components/FormBuilder/ComponentWrapper/InputWrapper"
import { useFormContext } from "react-hook-form"
import dayjs from "dayjs"
import type { RangePickerProps } from "antd/es/date-picker"
import {
    default_time_format,
    showFormat,
} from "@/components/FormBuilder/components/Date/format"

type FormDatePickerProps = IFormRangeComponent &
    RangePickerProps

function FormRangePicker({
    className,
    label,
    fieldName,
    dependOn,
    showOn,
    ...props
}: FormDatePickerProps) {
    const { watch, setValue } = useFormContext()

    const [startDate, endDate] = watch([
        fieldName[0],
        fieldName[1],
    ])
    return (
        <ComponentWrapper
            dependOn={dependOn}
            label={label}
            fieldName={fieldName[1]}
            className={className}
            showOn={showOn}
        >
            return{" "}
            <DatePicker.RangePicker
                format={showFormat}
                style={{ width: "100%" }}
                value={
                    startDate && endDate
                        ? [
                              dayjs(
                                  startDate,
                                  default_time_format,
                              ),
                              dayjs(
                                  endDate,
                                  default_time_format,
                              ),
                          ]
                        : undefined
                }
                {...props}
                id={fieldName[0]}
                onChange={(date) => {
                    if (!date) {
                        setValue(fieldName[0], undefined)
                        setValue(fieldName[1], undefined)
                        return
                    }

                    setValue(
                        fieldName[0],
                        dayjs(date[0])
                            .format(default_time_format)
                            .toString(),
                    )
                    setValue(
                        fieldName[1],
                        dayjs(date[1])
                            .format(default_time_format)
                            .toString(),
                    )

                    // return field.onChange(date ?
                    //     [dayjs(date[0]).format(default_time_format).toString(), dayjs(date[1]).format(default_time_format).toString()] : undefined
                    // )
                }}
            ></DatePicker.RangePicker>
        </ComponentWrapper>
    )
}

export default FormRangePicker
