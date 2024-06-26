import { getAppSession } from "@/app/actions";
import LoginForm from "@/lib/components/auth/LoginForm";
import { Button } from "@/lib/components/common/Button";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
    const { sessionData } = await getAppSession();

    if (sessionData) {
        return redirect("/");
    }

    const t = await getTranslations("Sidebar");

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-primary/10">
                <div className="max-w-[450px] w-full p-5 space-y-5">
                    <h1 className="text-3xl font-semibold mb-5">
                        Welcome back.
                    </h1>

                    <LoginForm />

                    <Button
                        type="submit"
                        className="w-full"
                        variant="outline"
                        asChild
                    >
                        <Link href="/">
                            <ArrowLeft />
                            <span className="ml-2">Zurück</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    );
}
