'use client'

import { Button } from '@/lib/components/common/Button'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

const ResetFormSubmitButton = () => {
    const form = useFormContext()
    const t = useTranslations('PwdReset')
    return (
        <Button
            type="submit"
            className="w-full shadow-lg shadow-primary/40"
            size="lg"
            loading={form.formState.isSubmitting}
        >
            {t('set-new-password')}
        </Button>
    )
}
export default ResetFormSubmitButton
