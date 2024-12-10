'use client'

import { Button, ButtonProps } from '@/lib/components/common/Button'
import { useFormContext } from 'react-hook-form'

export const FormSubmitButton = (props: ButtonProps) => {
    const form = useFormContext()
    return (
        <Button
            {...props}
            disabled={props.disabled || !form.formState.isValid}
            loading={props.loading || form.formState.isSubmitting}
        ></Button>
    )
}
