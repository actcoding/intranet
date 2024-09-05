"use server";

import { newsApi } from "@/lib/api/api";
import {
    FetchError,
    News,
    NewsStoreRequest,
    NewsUpdateOperationRequest,
    NewsUploadTypeEnum,
    ResponseError,
} from "@/lib/api/generated";
import { deserializeFileData } from "@/lib/utils";

export type ApiResult<T, E = { message: string }> =
    | {
        data: T
        error: null
    }
    | {
        data: null
        error: E
    }

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

export async function createNewsAction(newsStoreRequest: NewsStoreRequest): Promise<ApiResult<News>> {
    try {
        const data = await newsApi.newsStore({
            newsStoreRequest,
        })
        return {
            data,
            error: null,
        }
    } catch (error) {
        console.error(error)
        if (error instanceof ResponseError || error instanceof FetchError) {
            return {
                data: null,
                error: {
                    message: error.message,
                }
            }
        }

        return {
            data: null,
            error: {
                //@ts-expect-error error is unknown
                message: error.message,
            }
        }
    }
}

export async function editNewsAction(request: NewsUpdateOperationRequest) {
    return newsApi.newsUpdate(request);
}

export async function deleteNewsAction(id: number, force: boolean = false) {
    return newsApi.newsDestroy({ id, force });
}

export async function restoreNewsAction(id: number) {
    return newsApi.newsRestore({ id });
}

export async function uploadNewsFileAction(
    id: number,
    type: NewsUploadTypeEnum,
    formData: FormData
) {
    return newsApi.newsUpload({
        id,
        type,
        file: deserializeFileData(formData) as Blob,
    });
}
