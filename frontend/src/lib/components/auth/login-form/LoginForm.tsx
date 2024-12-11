'use client'

import { handleLogin } from '@/lib/actions/auth'
import LoginFormEmailInput from '@/lib/components/auth/login-form/components/LoginFormEmailInput'
import LoginFormPasswordInput from '@/lib/components/auth/login-form/components/LoginFormPasswordInput'
import LoginFormSubmitButton from '@/lib/components/auth/login-form/components/LoginFormSubmitButton'
import { Alert, AlertDescription } from '@/lib/components/common/Alert'
import { Form } from '@/lib/components/common/Form'
import { useToast } from '@/lib/components/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const LoginForm = () => {
    const t = useTranslations('Auth')
    const { toast } = useToast()

    const formSchema = z.object({
        email: z.string().email({ message: t('error-email') }),
        password: z.string().min(1, {
            message: t('error-password-missing'),
        }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const handleSubmit = useCallback(
        async (data: z.infer<typeof formSchema>) => {
            const res = await handleLogin(data)

            if (res === undefined) {
                toast({
                    title: t('success-title'),
                })
            } else {
                form.setError('root', { message: t('error-login') })
            }
        },
        [form, t, toast],
    )

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => handleSubmit(data))}
                className="space-y-4"
            >
                {form.formState.errors.root ? (
                    <Alert variant={'destructive'}>
                        <AlertDescription>
                            {form.formState.errors.root.message}
                        </AlertDescription>
                    </Alert>
                ) : null}
                <LoginFormEmailInput />
                <LoginFormPasswordInput />
                <LoginFormSubmitButton />
            </form>
        </Form>
    )
}
export default LoginForm
