import { ApiErrors } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function setLaravelFormErrors<T extends FieldValues = FieldValues>(
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

export function serializeFileData(data: File | File[]) {
    const formData = new FormData();
    if (Array.isArray(data)) {
        data.forEach((file) => {
            formData.append("file[]", file);
        });
        return formData;
    } else {
        formData.append("file", data);
        return formData;
    }
}

export function deserializeFileData(formData: FormData) {
    if (formData.has("file[]")) {
        return Array.from(formData.getAll("file[]")) as File[];
    } else {
        return formData.get("file") as File;
    }
}
