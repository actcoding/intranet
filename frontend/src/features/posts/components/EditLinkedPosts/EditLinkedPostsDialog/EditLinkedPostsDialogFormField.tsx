'use client'

import {EditLinkedPostsDialogRadioItem} from '@/features/posts/components/EditLinkedPosts'
import {usePost} from '@/features/posts/hooks'
import {LinkPostFormValues, Post} from '@/features/posts/types'
import {FormControl, FormField, FormItem, FormLabel} from '@/lib/components/common/Form'
import {RadioGroup} from '@/shared/components/RadioGroup'
import {useFormContext} from 'react-hook-form'

interface EditLinkedPostsDialogFormFieldProps {
    items: Post[];
}

const EditLinkedPostsDialogFormField = ({items}: EditLinkedPostsDialogFormFieldProps) => {
    const form = useFormContext<LinkPostFormValues>()
    const {post} = usePost<Post>()
    const alreadyLinked = 'linkedEvents' in post ? post.linkedEvents : 'linkedNews' in post ? post.linkedNews : []
    const alreadyLinkedSet = new Set(alreadyLinked?.map((item) => item.id))

    return (
        <FormField
            control={form.control}
            name="postId"
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormLabel>Post auswählen</FormLabel>
                        <FormControl>
                            <RadioGroup
                                className="flex flex-col gap-3"
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                {items.map((item) => (
                                    <EditLinkedPostsDialogRadioItem id={item.id.toString()} key={item.id} value={item.id.toString()} disabled={alreadyLinkedSet.has(item.id)} post={item}/>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </FormItem>
                )
            }}
        />
    )
}

export { EditLinkedPostsDialogFormField }
