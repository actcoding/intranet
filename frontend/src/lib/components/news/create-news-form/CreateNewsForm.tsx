'use client'

import {
    editNewsAction,
} from '@/lib/actions/news'
import { NewsResource } from '@/lib/api/generated'
import { Form } from '@/lib/components/common/Form'
import {
    NewsContentFormField,
    NewsTitleFormField,
} from '@/lib/components/news/create-news-form/components/news-form-fields'
import { createNewsFormSchema } from '@/lib/components/news/create-news-form/CreateNewsForm.config'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useToast } from '../../hooks/use-toast'
import NewsProvider from '../provider'

interface CreateNewsFormProps {
    news: NewsResource;
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

    async function handleSubmit(values: z.infer<typeof createNewsFormSchema>) {
        try {
            await editNewsAction({
                id: props.news.id,
                newsUpdateRequest: {
                    title: values.title,
                    content: values.content,
                },
            })

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
                    id='create-news-form'
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-4"
                >
                    <NewsTitleFormField form={form} />
                    <NewsContentFormField form={form} />
                    {/* <Button type="submit" className="float-end">
                        Speichern
                    </Button> */}
                </form>
            </Form>
        </NewsProvider>
    )
}

export default CreateNewsForm
