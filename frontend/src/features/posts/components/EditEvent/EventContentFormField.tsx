'use client'

import {uploadEventFile} from '@/features/posts/actions'
import {usePost} from '@/features/posts/hooks'
import {Event, EventFormValues} from '@/features/posts/types'
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/lib/components/common/Form'
import {useToast} from '@/lib/components/hooks/use-toast'
import Editor
    from '@/lib/components/news/create-news-form/components/news-form-fields/news-content-form-field/components/editor/Editor'
import {serializeFileData} from '@/lib/utils'
import {useFormContext} from 'react-hook-form'

interface EventContentFormField {
    label: string;
}

const EventContentFormField = (props: EventContentFormField) => {
    const form = useFormContext<EventFormValues>()
    const { post } = usePost<Event>()
    const { toast } = useToast()
    return (
        <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="sr-only">{props.label}</FormLabel>
                    <FormControl>
                        <Editor
                            {...field}
                            onImageSelect={async (file, editor) => {
                                const { error, data } = await uploadEventFile(
                                    post.id,
                                    'content',
                                    serializeFileData(file),
                                )

                                if (error) {
                                    toast({
                                        title: 'Fehler',
                                        description: error.message,
                                        variant: 'destructive',
                                    })
                                    return
                                }

                                editor
                                    ?.chain()
                                    .focus()
                                    .setImage({
                                        // TODO: Better types
                                        src: data!.url,
                                    })
                                    .run()
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export { EventContentFormField }
