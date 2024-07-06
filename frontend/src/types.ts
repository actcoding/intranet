import { ZodObject, ZodOptional, ZodType } from "zod";

export interface ApiError {
    code: number;
    error: string;
}

export type ApiErrors = Record<string, string[]>;

export type ApiResponse = {
    status: 400 | 401 | 403 | 406 | 422 | 429 | 500 | 503 | number
    message: string
    errors: ApiErrors
}

// https://github.com/colinhacks/zod/issues/53#issuecomment-1681090113
export type ToZod<T> = {
    [K in keyof T]: T[K] extends string | number | boolean | null | undefined
        ? undefined extends T[K]
            ? ZodOptional<ZodType<Exclude<T[K], undefined>>>
            : ZodType<T[K]>
        : ZodObject<ToZod<T[K]>>;
};
