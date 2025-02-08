import { useEffect, useState } from 'react'

/**
 * Defines a "controlled" value as a "defined" value,
 * thus a value which is neither `null` nor `undefined`.
 *
 * @param value The value to check whether it is defined or not.
 * @returns Whether the given value is defined or not.
 */
function isControlled<T>(value: T | undefined): value is T {
    return value !== undefined
}

/**
 * Hook to manage controllable state in React components.
 *
 * This hook allows you to create a state that can be controlled by a parent component
 * through the `controlledValue` prop, or uncontrolled, where the state is managed
 * internally by the component.
 *
 * @param controlledValue The controlled value of the state, or `undefined` if uncontrolled.
 * @param defaultValue The default value of the state if it's uncontrolled.
 *
 * @returns An array containing:
 *  - The current value of the state.
 *  - A function to update the state, only applicable when the state is uncontrolled.
 *  - A boolean indicating whether the state is controlled or not.
 */
export function useControllableState<T>(
    controlledValue: T | undefined,
    defaultValue: T,
) {
    const [internalValue, setInternalValue] = useState(
        controlledValue ?? defaultValue,
    )

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
