import {useEffect, useState} from 'react'

export function useControllableState<T>(
    controlledValue: T | undefined,
    defaultValue: T,
) {
    const [internalValue, setInternalValue] = useState(
        controlledValue ?? defaultValue,
    )

    const isControlled = (value: T | undefined): value is T => {
        return value !== undefined
    }

    useEffect(() => {
        if (isControlled(controlledValue)) {
            setInternalValue(controlledValue)
        }
    }, [controlledValue])

    return [
        internalValue,
        (value: T) => {
            if (!isControlled(controlledValue)) {
                setInternalValue(value)
            }
        },
        isControlled(controlledValue),
    ] as const
}
