'use client'

import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/lib/components/common/Form'
import { Input } from '@/lib/components/common/Input'
import { Label } from '@/lib/components/common/Label'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

const LoginFormEmailInput = () => {
    const form = useFormContext()
    const t = useTranslations('Auth')
    return (
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                    <Label>{t('email')}</Label>
                    <FormControl>
                        <Input {...field} placeholder="example@mail.com" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
export default LoginFormEmailInput
