'use client'

import { createNewsAction } from '@/lib/actions/news'
import { Button } from '@/lib/components/common/Button'
import { Form } from '@/lib/components/common/Form'
import { useToast } from '@/lib/components/hooks/use-toast'
import { NewsTitleFormField } from '@/lib/components/news/create-news-form/components/news-form-fields'
import { createContentFormSchema } from '@/lib/components/shared/create-content-form/CreateContentForm.config'
import { CreateContentFormSchema } from '@/lib/components/shared/create-content-form/CreateContentForm.model'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

const CreateContentForm = () => {
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<CreateContentFormSchema>({
        resolver: zodResolver(createContentFormSchema),
        defaultValues: {
            title: '',
        },
    })

    const handleSubmit = useCallback(
        async (values: CreateContentFormSchema) => {
            const { data, error } = await createNewsAction({
                title: values.title,
                content: 'Hier könnte Ihre Neugikeit stehen.',
                status: 'draft',
            })

            if (error) {
                toast({
                    title: 'Fehler',
                    description: error.message as string,
                    variant: 'destructive',
                })
                return
            }

            toast({
                title: 'Entwurf erstellt',
                description:
                    'Der Entwurf wurde erstellt und kann jetzt vollumfänglich bearbeitet werden.',
            })

            const { id } = data
            router.push(`/manage/news/${id}`)
        },
        [router, toast],
    )

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <NewsTitleFormField form={form} />

                <div className="flex flex-row justify-end">
                    <Button type="submit">Speichern</Button>
                </div>
            </form>
        </Form>
    )
}

export default CreateContentForm
