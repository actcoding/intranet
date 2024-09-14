import LoginForm from '@/lib/components/auth/login-form/LoginForm'
import { Button } from '@/lib/components/common/Button'
import pick from 'lodash/pick'
import { ArrowLeft } from 'lucide-react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { getAppSession } from '@/lib/actions/auth'

export default async function Login() {
    const { sessionData } = await getAppSession()

    if (sessionData) {
        return redirect('/')
    }

    const t = await getTranslations('Auth')
    const messages = await getMessages()

    return (<>
        <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-primary/10">
            <div className="w-full max-w-[450px] space-y-5 p-5">
                <Image
                    src="/logo.png"
                    width={80}
                    height={80}
                    alt="Logo"
                    className="mx-auto"
                />
                <h1 className="mb-5 text-center text-3xl font-semibold">
                    {t('welcome')}
                </h1>
                <NextIntlClientProvider messages={pick(messages, 'Auth')}>
                    <LoginForm />
                </NextIntlClientProvider>
                <Button
                    type="submit"
                    className="w-full"
                    variant="outline"
                    asChild
                >
                    <Link href="/">
                        <ArrowLeft />
                        <span className="ml-2">{t('back')}</span>
                    </Link>
                </Button>
            </div>
        </div>
    </>)
}
