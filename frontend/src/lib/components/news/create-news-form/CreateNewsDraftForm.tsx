"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { Form } from "../../common/Form"
import { NewsTitleFormField } from "./components/news-form-fields"
import { Button } from "../../common/Button"
import { useCallback } from "react"
import { createNewsAction } from "@/lib/actions/news"
import { useToast } from "../../hooks/use-toast"

const formSchema = z.object({
    title: z.string().min(1),
})

export type CreateNewsFormSchema = z.infer<typeof formSchema>
export type CreateDraftNewsForm = UseFormReturn<CreateNewsFormSchema>

export default function CreateNewsDraftForm() {
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<CreateNewsFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
        },
    })

    const handleSubmit = useCallback(async (values: CreateNewsFormSchema) => {
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
            description: 'Der Entwurf wurde erstellt und kann jetzt vollumfänglich bearbeitet werden.'
        })

        const { id } = data
        router.push(`/manage/news/${id}`)
    }, [router, toast])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <NewsTitleFormField form={form} />

                <div className="flex flex-row justify-end">
                    <Button
                        type="submit"
                    >
                        Speichern
                    </Button>
                </div>
            </form>
        </Form>
    )
}