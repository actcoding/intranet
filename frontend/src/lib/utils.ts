import { ApiErrors } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function setLaravelErrors<T extends FieldValues = FieldValues>(
    form: UseFormReturn<T>,
    errors: ApiErrors,
    getMessage: (key: string, value: string) => string
) {
    Object.keys(errors).forEach((key) => {
        const message = getMessage(key, errors[key].at(0) ?? "unknown");

        //@ts-expect-error // TODO: need to find the type
        form.setError(key, { message });
    });
}
