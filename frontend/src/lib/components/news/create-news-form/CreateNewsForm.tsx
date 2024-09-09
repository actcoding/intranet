'use client'

import {
    editNewsAction,
    uploadNewsFileAction,
} from '@/lib/actions/news'
import { News } from '@/lib/api/generated'
import { Button } from '@/lib/components/common/Button'
import { Form } from '@/lib/components/common/Form'
import {
    NewsContentFormField,
    NewsHeaderImageFormField,
    NewsTitleFormField,
} from '@/lib/components/news/create-news-form/components/news-form-fields'
import { createNewsFormSchema } from '@/lib/components/news/create-news-form/CreateNewsForm.config'
import { serializeFileData, urlToFile } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useToast } from '../../hooks/use-toast'
import NewsProvider from '../provider'

interface CreateNewsFormProps {
    news: News;
}

const CreateNewsForm = (props: CreateNewsFormProps) => {
    const form = useForm<z.infer<typeof createNewsFormSchema>>({
        resolver: zodResolver(createNewsFormSchema),
        defaultValues: {
            title: props.news?.title ?? '',
            content: props.news?.content ?? '',
        },
    })

    // const router = useRouter();
    const { toast } = useToast()

    useEffect(() => {
        async function loadHeaderImage() {
            if (props.news?.headerImage) {
                try {
                    const file = await urlToFile(
                        props.news.headerImage,
                        'header.png',
                    )
                    form.setValue('headerImage', file, {
                        shouldDirty: false,
                        shouldTouch: false,
                        shouldValidate: false,
                    })
                } catch (error) {
                    console.error(
                        'Fehler beim Laden des Header-Bildes:',
                        error,
                    )
                }
            }
        }

        loadHeaderImage()
    }, [props.news?.headerImage, form])

    async function handleSubmit(values: z.infer<typeof createNewsFormSchema>) {
        try {
            const { id } = await editNewsAction({
                id: props.news.id,
                newsUpdateRequest: {
                    title: values.title,
                    content: values.content,
                },
            })

            if (form.getFieldState('headerImage').isDirty && values.headerImage !== null) {
                await uploadNewsFileAction(
                    id,
                    'header',
                    serializeFileData(values.headerImage),
                )
            }

            toast({
                title: 'Gespeichert',
            })
        } catch (error) {
            console.error('News creation or file upload failed:', error)
        }
    }

    return (
        <NewsProvider news={props.news}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-4"
                >
                    <NewsTitleFormField form={form} />
                    <NewsHeaderImageFormField form={form} />
                    <NewsContentFormField form={form} />
                    <Button type="submit" className="float-end">
                        Speichern
                    </Button>
                </form>
            </Form>
        </NewsProvider>
    )
}

export default CreateNewsForm
