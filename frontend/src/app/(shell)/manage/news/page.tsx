import { newsApi } from "@/lib/api/api";
import { DataTable } from "@/lib/components/common/DataTable";
import { columns } from "@/lib/components/manage/manage-news/manage-news-table/components/columns";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

interface Props {}

const ManageNewsPage = async (props: Props) => {
    const newsList = await newsApi.newsIndex({ page: 1, perPage: 10 });
    const messages = await getMessages();
    return (
        <NextIntlClientProvider messages={pick(messages, ["News"])}>
            <DataTable columns={columns} data={newsList.data} />
        </NextIntlClientProvider>
    );
};
export default ManageNewsPage;
