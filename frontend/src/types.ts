import { ZodObject, ZodOptional, ZodType } from "zod";

export interface ApiError {
    code: number;
    error: string;
}

export type ApiErrors = Record<string, string[]>;

// https://github.com/colinhacks/zod/issues/53#issuecomment-1681090113
export type ToZod<T> = {
    [K in keyof T]: T[K] extends string | number | boolean | null | undefined
        ? undefined extends T[K]
            ? ZodOptional<ZodType<Exclude<T[K], undefined>>>
            : ZodType<T[K]>
        : ZodObject<ToZod<T[K]>>;
};
