import { getAppSession } from "@/app/actions";
import PasswordResetForm from "@/lib/components/auth/reset-form/PasswordResetForm";
import pick from "lodash/pick";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useMemo } from "react";

const PageWelcome = async () => {
    const { sessionData, access_token } = await getAppSession();

    if (!access_token) {
        return redirect("/auth/login");
    }

    if (sessionData?.user.status !== "must_reset_password") {
        return redirect("/");
    }

    const t = await getTranslations("PwdReset");
    const messages = await getMessages();

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-primary/10">
                <div className="max-w-[850px] w-full p-5 space-y-5">
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
                    <div className="grid grid-cols-2 gap-x-16">
                        <div className="space-y-4">
                            <p>
                                {t("welcome", { name: sessionData?.user.name })}
                            </p>
                            <p>{t("msg1")}</p>
                            <p>{t("msg2")}</p>
                        </div>

                        <NextIntlClientProvider
                            messages={pick(messages, "PwdReset", "Auth")}
                        >
                            <PasswordResetForm />
                        </NextIntlClientProvider>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageWelcome;
