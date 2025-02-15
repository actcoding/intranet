'use client'

import {editNewsAction} from '@/lib/actions/news'
import {NewsResource} from '@/lib/api/generated'
import {Form} from '@/lib/components/common/Form'
import {
    NewsContentFormField,
    NewsTitleFormField,
} from '@/lib/components/news/create-news-form/components/news-form-fields'
import {createNewsFormSchema, CreateNewsFormValues} from '@/lib/components/news/create-news-form/CreateNewsForm.config'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {useToast} from '../../hooks/use-toast'

interface CreateNewsFormProps {
    news: NewsResource;
}

const CreateNewsForm = (props: CreateNewsFormProps) => {
    const form = useForm<CreateNewsFormValues>({
        resolver: zodResolver(createNewsFormSchema),
        defaultValues: {
            title: props.news?.title ?? '',
            content: props.news?.content ?? '',
        },
    })

    // const router = useRouter();
    const { toast } = useToast()

    async function handleSubmit(values: CreateNewsFormValues) {
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
        <Form {...form}>
            <form
                id="create-news-form"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <NewsTitleFormField />
                <NewsContentFormField />
                {/* <Button type="submit" className="float-end">
                        Speichern
                    </Button> */}
            </form>
        </Form>
    )
}

export default CreateNewsForm
