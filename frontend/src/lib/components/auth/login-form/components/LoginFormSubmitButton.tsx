'use client'

import { Button } from '@/lib/components/common/Button'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

interface Props {}
const LoginFormSubmitButton = (props: Props) => {
    const form = useFormContext()
    const t = useTranslations('Auth')
    return (
        <Button
            type="submit"
            className="w-full shadow-lg shadow-primary/40"
            size="lg"
            loading={form.formState.isSubmitting}
        >
            {t('login')}
        </Button>
    )
}
export default LoginFormSubmitButton
