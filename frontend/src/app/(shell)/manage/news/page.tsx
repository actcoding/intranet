import { apiFetch } from "@/lib/api";
import { DataTable } from "@/lib/components/common/DataTable";
import { columns } from "@/lib/components/manage/manage-news/manage-news-table/components/columns";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

interface Props {}

const ManageNewsPage = async (props: Props) => {
    const res = await apiFetch("/news");
    const data = await res.json();
    const messages = await getMessages();
    return (
        <NextIntlClientProvider messages={pick(messages, ["News"])}>
            <DataTable columns={columns} data={data.data} />
        </NextIntlClientProvider>
    );
};
export default ManageNewsPage;
