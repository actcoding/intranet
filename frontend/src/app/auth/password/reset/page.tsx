import PasswordResetForm from '@/lib/components/auth/reset-form/PasswordResetForm'
import { NextIntlClientProvider } from 'next-intl'
import Image from 'next/image'
import pick from "lodash/pick"
import { getAppSession } from '@/app/actions'
import { redirect } from 'next/dist/server/api-utils'
import { getMessages, getTranslations } from 'next-intl/server'


const PasswordReset = async () => {

    const { sessionData } = await getAppSession();

    const t = await getTranslations("PwdReset");
    const messages = await getMessages();

    return (
        <>
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-primary/10">
            <div className="max-w-[450px] w-full p-5 space-y-5">
                <Image
                    src="/logo.png"
                    width={80}
                    height={80}
                    alt="Logo"
                    className="mx-auto"
                />
                <h1 className="text-3xl font-semibold mb-5 text-center">
                    {t("set_new_password")}
                </h1>
                <NextIntlClientProvider messages={pick(messages, "PwdReset")}>
                    <PasswordResetForm />
                </NextIntlClientProvider>
            </div>
        </div>
    </>
     );
}

export default PasswordReset   ;
