'use client'

import {usePost} from '@/features/posts/hooks'
import {News} from '@/features/posts/types'
import {uploadNewsFileAction} from '@/lib/actions/news'
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/lib/components/common/Form'
import {useToast} from '@/lib/components/hooks/use-toast'
import {CreateNewsFormValues} from '@/lib/components/news/create-news-form/CreateNewsForm.config'
import {useFormContext} from 'react-hook-form'
import Editor from './components/editor/Editor'

const NewsContentFormField = () => {
    const form = useFormContext<CreateNewsFormValues>()
    const { toast } = useToast()
    const { post: news } = usePost<News>()
    return (
        <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="sr-only">Content</FormLabel>
                    <FormControl>
                        <Editor
                            {...field}
                            onImageSelect={async (file, editor) => {
                                const uploadData = new FormData()
                                uploadData.set('file', file)
                                const { error, data } =
                                    await uploadNewsFileAction(
                                        news.id,
                                        'content',
                                        uploadData,
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
export { NewsContentFormField }
