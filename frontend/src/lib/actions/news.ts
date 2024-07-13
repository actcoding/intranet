"use server";

import { newsApi } from "@/lib/api/api";
import { NewsStoreRequest } from "@/lib/api/generated";

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
    return newsApi.newsStore({ newsStoreRequest: data });
}
