'use client'

import { createEventAction } from '@/lib/actions/events'
import { createNewsAction } from '@/lib/actions/news'
import { Button } from '@/lib/components/common/Button'
import { Form } from '@/lib/components/common/Form'
import { useToast } from '@/lib/components/hooks/use-toast'
import { NewsTitleFormField } from '@/lib/components/news/create-news-form/components/news-form-fields'
import { createDraftFormSchema } from '@/lib/components/shared/create-content-draft-form/CreateDraftForm.config'
import { CreateDraftFormValues } from '@/lib/components/shared/create-content-draft-form/CreateDraftForm.model'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { ContentTypeFormField } from './components'
import dayjs from '@/lib/dayjs'

interface CreateContentFormProps {
    onSuccess?: () => void;
}

const CreateDraftForm = ({ onSuccess }: CreateContentFormProps) => {
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<CreateDraftFormValues>({
        resolver: zodResolver(createDraftFormSchema),
        defaultValues: {
            title: '',
            type: 'news',
        },
        mode: 'onChange',
    })

    const handleSubmit = useCallback(
        async (values: CreateDraftFormValues) => {
            let response
            switch (values.type) {
                case 'news':
                    response = await createNewsAction({
                        title: values.title,
                        content: 'Hier könnte Ihre Neuigkeit stehen.',
                        status: 'draft',
                    })
                    break
                case 'event':
                    response = await createEventAction({
                        title: values.title,
                        content: 'Hier könnte Ihre Eventbeschreibung stehen.',
                        startingAt: dayjs().format(),
                        endingAt: dayjs().add(1, 'day').format(),
                    })
                    break
            }
            const { data, error } = response

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

            onSuccess && onSuccess()
            switch (values.type) {
                case 'news':
                    router.push(`/manage/news/${data.id}`)
                    break
                case 'event':
                    router.push(`/manage/events/${data.id}`)
                    break
            }
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
