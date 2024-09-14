import { getAppSession } from '@/lib/actions/auth'
import PasswordResetForm from '@/lib/components/auth/reset-form/PasswordResetForm'
import pick from 'lodash/pick'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const PageWelcome = async () => {
    const { sessionData, access_token } = await getAppSession()

    if (!access_token) {
        return redirect('/auth/login')
    }

    if (sessionData?.user.status !== 'must_reset_password') {
        return redirect('/')
    }

    const t = await getTranslations('PwdReset')
    const messages = await getMessages()

    return (<>
        <div className="grid h-screen grid-cols-2 items-center">
            <div className="mx-auto space-y-4 p-8">
                <p className="font-semibold">
                    {t('welcome', { name: sessionData?.user.name })}
                </p>
                <p>{t('description-1')}</p>
                <p>{t('description-2')}</p>
            </div>
            <div className="h-full bg-gradient-to-b from-primary/10 p-8">
                <div className="mx-auto flex size-full max-w-[400px] flex-col justify-center">
                    <Image
                        src="/logo.png"
                        width={80}
                        height={80}
                        alt="Logo"
                        className="mx-auto mb-4"
                    />
                    <h1 className="mb-5 text-center text-3xl font-semibold">
                        {t('set-new-password')}
                    </h1>
                    <NextIntlClientProvider
                        messages={pick(messages, 'PwdReset', 'Auth')}
                    >
                        <PasswordResetForm />
                    </NextIntlClientProvider>
                </div>
            </div>
        </div>
    </>)
}

export default PageWelcome
