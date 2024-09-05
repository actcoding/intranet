import { newsApi } from "@/lib/api/api";
import { Button } from "@/lib/components/common/Button";
import { DataTable } from "@/lib/components/common/DataTable";
import { columns } from "@/lib/components/manage/manage-news/manage-news-table/ManageNewsTable.config";
import { pick } from "lodash";
import { PlusIcon } from "lucide-react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Link from "next/link";

interface Props {
    searchParams?: {
        page?: string;
    };
}

const ManageNewsPage = async (props: Props) => {
    const currentPage = Number(props.searchParams?.page) || 1;

    const newsList = await newsApi.newsIndex({
        page: currentPage,
        perPage: 10,
    });
    const hasNextPage = newsList?.links.next;
    const total: number = newsList?.meta.total;
    const pageSize = newsList?.meta.perPage;
    const totalPages = Math.ceil(total / pageSize);
    const messages = await getMessages();
    return (
        <NextIntlClientProvider messages={pick(messages, ["News"])}>
            <div className="flex mb-4 flex-row-reverse">
                <Button asChild>
                    <Link href="/manage/news/create">
                        <PlusIcon className="me-2" size={20} />
                        Erstellen
                    </Link>
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={newsList.data}
                hasNextPage={hasNextPage}
                totalPages={totalPages}
            />
        </NextIntlClientProvider>
    );
};
export default ManageNewsPage;
