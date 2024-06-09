import LoginForm from "@/lib/components/auth/LoginForm";
import { redirect } from 'next/navigation';
import { getAppSession } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/components/common/Card'
import { getTranslations } from 'next-intl/server'

export default async function Login() {
    const { sessionData } = await getAppSession();

    if (sessionData) {
        return redirect("/");
    }

    const t = await getTranslations("Sidebar");

    return (<>
        <div className='w-1/3 space-y-4 mx-auto py-32'>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {t('creator-login')}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    </>);
}
