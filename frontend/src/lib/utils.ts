import { ApiErrors, AppJwtPayload } from '@/types'
import { type ClassValue, clsx } from 'clsx'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function setLaravelFormErrors<T extends FieldValues = FieldValues>(
    form: UseFormReturn<T>,
    errors: ApiErrors,
    getMessage: (key: string, value: string) => string,
) {
    Object.keys(errors).forEach((key) => {
        const message = getMessage(key, errors[key].at(0) ?? 'unknown')

        //@ts-expect-error // TODO: need to find the type
        form.setError(key, { message })
    })
}

export function serializeFileData(data: File | File[]): FormData {
    const formData = new FormData()
    if (Array.isArray(data)) {
        data.forEach((file) => {
            formData.append('file[]', file)
        })
    } else {
        formData.append('file', data)
    }
    return formData
}

export function deserializeFileData(formData: FormData): File | File[] {
    if (formData.has('file[]')) {
        return formData.getAll('file[]') as File[]
    } else {
        return formData.get('file') as File
    }
}

export async function urlToFile(url: string, filename: string): Promise<File> {
    const response = await fetch(url)
    const type = response.headers.get('Content-Type')!
    const blob = await response.blob()
    return new File([blob], filename, { type })
}

export function isCreator(sessionData?: AppJwtPayload): boolean {
    return sessionData?.roles.includes('Creator') ?? false
}

export const isProduction = () => process.env.NODE_ENV === 'production'
