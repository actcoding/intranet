"use server";

import { newsApi } from "@/lib/api/api";
import { NewsStoreRequest } from "@/lib/api/generated";
import { redirect } from "next/navigation";

export async function getNewsListAction({
    page,
    perPage,
}: {
    page: number;
    perPage: number;
}) {
    const newsList = await newsApi.newsIndex({ page, perPage });
    return newsList.data;
}

export async function createNewsAction(data: NewsStoreRequest) {
    const res = await newsApi.newsStore({
        newsStoreRequest: data,
    });
    redirect(`/news/${res.id}`);
}

export async function deleteNewsAction(id: number, force: boolean = false) {
    return newsApi.newsDestroy({ id, force });
}
