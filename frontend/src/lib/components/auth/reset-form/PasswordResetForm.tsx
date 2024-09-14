'use client'

import { ResetPasswordPayload, resetPassword } from '@/lib/actions/auth'
import ResetFormConfirmInput from '@/lib/components/auth/reset-form/components/ResetFormConfirmInput'
import ResetFormPasswordInput from '@/lib/components/auth/reset-form/components/ResetFormPasswordInput'
import ResetFormSubmitButton from '@/lib/components/auth/reset-form/components/ResetFormSubmitButton'
import { Alert, AlertDescription } from '@/lib/components/common/Alert'
import { Form } from '@/lib/components/common/Form'
import { useToast } from '@/lib/components/hooks/use-toast'
import { setLaravelFormErrors } from '@/lib/utils'
import { ToZod } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const PasswordResetForm = () => {
    const tAuth = useTranslations('Auth')
    const tPage = useTranslations('PwdReset')

    const formSchema = useMemo(
        () =>
            z.object<ToZod<ResetPasswordPayload>>({
                password: z.string().min(8, {
                    message: tAuth('error-password-too-short', {
                        minCharCount: 8,
                    }),
                }),
                password_confirmation: z.string().min(8, {
                    message: tAuth('error-password-too-short', {
                        minCharCount: 8,
                    }),
                }),
            }),
        [tAuth],
    )

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            password_confirmation: '',
        },
    })

    const { toast } = useToast()

    const handleSubmit = useCallback(
        async (data: ResetPasswordPayload) => {
            const res = await resetPassword(data)

            if (res === undefined) {
                toast({
                    title: tPage('success-title'),
                    description: tPage('success-message'),
                })
            } else if (res.status === 422) {
                setLaravelFormErrors(form, res.errors, (key, value) => {
                    switch (value) {
                        case 'validation.confirmed':
                            return tPage('error-mismatch')
                        default:
                            return value
                    }
                })
            } else {
                form.setError('root', { message: res.message })
            }
        },
        [form, tPage, toast],
    )

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                {form.formState.errors.root ? (
                    <Alert variant={'destructive'}>
                        <AlertDescription>
                            {form.formState.errors.root.message}
                        </AlertDescription>
                    </Alert>
                ) : null}

                <ResetFormPasswordInput />
                <ResetFormConfirmInput />
                <ResetFormSubmitButton />
            </form>
        </Form>
    )
}

export default PasswordResetForm
