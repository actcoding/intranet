'use client'

import { createNewsAction } from '@/lib/actions/news'
import { Button } from '@/lib/components/common/Button'
import { Form } from '@/lib/components/common/Form'
import { useToast } from '@/lib/components/hooks/use-toast'
import { NewsTitleFormField } from '@/lib/components/news/create-news-form/components/news-form-fields'
import { createDraftFormSchema } from '@/lib/components/shared/create-content-draft-form/CreateDraftForm.config'
import { createDraftForm } from '@/lib/components/shared/create-content-draft-form/CreateDraftForm.model'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { ContentTypeFormField } from './components'

interface CreateContentFormProps {
    onSuccess?: () => void;
}

const CreateDraftForm = ({ onSuccess }: CreateContentFormProps) => {
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<createDraftForm>({
        resolver: zodResolver(createDraftFormSchema),
        defaultValues: {
            title: '',
            type: 'news',
        },
        mode: 'onChange',
    })

    const handleSubmit = useCallback(
        async (values: createDraftForm) => {
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
            onSuccess && onSuccess()
            router.push(`/manage/news/${id}`)
        },
        [router, toast, onSuccess],
    )

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <NewsTitleFormField />
                <ContentTypeFormField />
                <div className="flex flex-row justify-end">
                    <Button
                        type="submit"
                        disabled={!form.formState.isValid}
                        loading={form.formState.isSubmitting}
                    >
                        Speichern
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default CreateDraftForm
