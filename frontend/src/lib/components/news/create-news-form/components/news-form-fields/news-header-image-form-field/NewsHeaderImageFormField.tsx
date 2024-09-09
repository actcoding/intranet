'use client'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/lib/components/common/Form'
import { NewsHeaderImageUploadButton } from '@/lib/components/news/create-news-form/components/news-form-fields/news-header-image-form-field/components'
import {
    allowedFileTypes,
    createNewsFormSchema,
} from '@/lib/components/news/create-news-form/CreateNewsForm.config'
import { CreateNewsForm } from '@/lib/components/news/create-news-form/CreateNewsForm.models'
import FileImagePreview from '@/lib/components/shared/FileImagePreview'
import {
    FileSelector,
    FileSelectorBody,
    FileSelectorContent,
    FileSelectorFooter,
    FileSelectorHeader,
    FileSelectorInput,
    FileSelectorTitle,
    FileSelectorTrigger,
} from '@/lib/components/shared/FileSelector'
import { useState } from 'react'

interface NewsHeaderImageFormFieldProps {
    form: CreateNewsForm;
}

const NewsHeaderImageFormField = (props: NewsHeaderImageFormFieldProps) => {
    const [filePreview, setFilePreview] = useState<File | null>(null)

    function handleHeaderImagePreviewChange(files: File[] | null) {
        if (!files) {
            setFilePreview(null)
            return
        }
        const file = files[0]
        if (file) {
            const validation = createNewsFormSchema.safeParse({
                ...props.form.getValues(),
                headerImage: file,
            })
            if (validation.success) {
                setFilePreview(file)
                props.form.clearErrors('headerImage')
            } else {
                setFilePreview(null)
                props.form.setError('headerImage', validation.error.errors[0])
            }
        }
    }

    function handleFileSelectionConfirm(files: File[]) {
        props.form.setValue('headerImage', files[0], {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    return (
        <FormField
            control={props.form.control}
            name="headerImage"
            render={({ field: { value, ...rest } }) => (
                <FormItem>
                    <FormLabel className="sr-only">Titelbild</FormLabel>
                    <FormControl>
                        <FileSelector
                            {...rest}
                            onChange={handleFileSelectionConfirm}
                            onPreviewChange={handleHeaderImagePreviewChange}
                            accept={allowedFileTypes.headerImage
                                .map((type) => `.${type}`)
                                .join(', ')}
                        >
                            <FileSelectorTrigger asChild>
                                <NewsHeaderImageUploadButton
                                    selectedFile={value}
                                />
                            </FileSelectorTrigger>
                            <FileSelectorContent>
                                <FileSelectorHeader>
                                    <FileSelectorTitle>
                                        Titelbild ändern
                                    </FileSelectorTitle>
                                </FileSelectorHeader>
                                <FileSelectorBody>
                                    <FileSelectorInput />
                                    {filePreview === null ? null : (
                                        <FileImagePreview image={filePreview} />
                                    )}
                                </FileSelectorBody>
                                <FileSelectorFooter />
                            </FileSelectorContent>
                        </FileSelector>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export { NewsHeaderImageFormField }
