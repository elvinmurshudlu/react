import {
    type PropsWithChildren,
    useEffect,
    useMemo,
    useRef,
} from "react"
import clsx from "clsx"
import { ErrorMessage } from "@hookform/error-message"
import { useFormContext } from "react-hook-form"
import { type IFormComponent } from "@/shared/FormBuilder/type"

function ComponentWrapper({
    className,
    children,
    fieldName,
    label,
    dependOn,
    showOn,
}: PropsWithChildren<IFormComponent>) {
    const {
        formState: { errors },
        watch,
        setValue,
    } = useFormContext()

    const initialDependedValue = useRef<string>("")
    const dependedValues = watch(dependOn ?? [])
    const dependedValuesString = dependedValues.toString()

    useEffect(() => {
        if (
            dependedValuesString !==
                initialDependedValue.current &&
            initialDependedValue.current !== ""
        ) {
            setValue(fieldName, null)
        }
        initialDependedValue.current = dependedValuesString
    }, [dependedValuesString, setValue, fieldName])

    const canRender = useMemo(() => {
        if (!showOn) return true
        return showOn(dependedValues)
    }, [showOn, dependedValues])

    if (!canRender) return null
    return (
        <div
            className={clsx(
                className,
                "flex flex-col gap-2 items-start",
            )}
        >
            <label htmlFor={fieldName}>{label}</label>
            {children}
            <ErrorMessage
                errors={errors}
                name={fieldName}
                render={({ message }) => <p>{message}</p>}
            />
        </div>
    )
}

export default ComponentWrapper
