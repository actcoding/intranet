"use server";

import { newsApi } from "@/lib/api/api";
import {
    NewsStoreRequest,
    NewsUpdateOperationRequest,
    NewsUploadTypeEnum,
} from "@/lib/api/generated";
import { deserializeFile } from "@/lib/utils";
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
    return newsApi.newsStore({
        newsStoreRequest: data,
    });
}

export async function editNewsAction(request: NewsUpdateOperationRequest) {
    return newsApi.newsUpdate(request);
}

export async function deleteNewsAction(id: number, force: boolean = false) {
    return newsApi.newsDestroy({ id, force });
}

export async function uploadNewsFileAction(
    id: number,
    type: NewsUploadTypeEnum,
    formData: FormData
) {
    return newsApi.newsUpload({ id, type, file: deserializeFile(formData) });
}
