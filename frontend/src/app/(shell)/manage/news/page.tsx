import { newsApi } from "@/lib/api/api";
import { DataTable } from "@/lib/components/common/DataTable";
import { columns } from "@/lib/components/manage/manage-news/manage-news-table/components/columns";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

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
