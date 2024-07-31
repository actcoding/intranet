import { getAppSession } from "@/lib/actions/auth";
import { Button } from "@/lib/components/common/Button";
import NewsList from "@/lib/components/news/news-list/NewsList";
import LoadMoreNews from "@/lib/components/news/news-list/components/LoadMoreNews";
import { PenToolIcon, PlusIcon, Settings2Icon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";

interface Props {}
const NewsPage = async (props: Props) => {
    const { sessionData } = await getAppSession();
    const t = await getTranslations("News");
    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-4xl font-semibold mb-4">News</h1>
                {sessionData?.roles.includes("Creator") && (
                    <div className="space-x-2">
                        <Button asChild>
                            <Link href="/manage/news/create">
                                <PlusIcon className="me-2" size={20} />
                                {t("create")}
                            </Link>
                        </Button>
                        <Button asChild variant={"secondary"}>
                            <Link href="/manage/news">
                                <Settings2Icon className="me-2" size={20} />
                                {t("manage")}
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
            <Suspense fallback={<LoadMoreNews />}>
                <NewsList />
            </Suspense>
        </>
    );
};
export default NewsPage;
