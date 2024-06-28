import { getTranslations } from "next-intl/server";

export default async function Home() {
    // const { sessionData } = await getAppSession();

    // if (!sessionData) {
    //     return redirect("/de/auth/login");
    // }
    const t = await getTranslations("Index");

    return <div>{t("title")}</div>;
}
