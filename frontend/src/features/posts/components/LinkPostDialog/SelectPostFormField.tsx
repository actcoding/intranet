import {LinkPostDialogRadioItem} from '@/features/posts/components/LinkPostDialog/LinkPostDialogRadioItem'
import {usePost} from '@/features/posts/hooks'
import {LinkPostFormValues, Post} from '@/features/posts/types'
import {FormControl, FormField, FormItem, FormLabel} from '@/lib/components/common/Form'
import {RadioGroup} from '@/shared/components/RadioGroup'
import {useFormContext} from 'react-hook-form'

interface SelectPostFormFieldProps {
    items: Post[];
}

export const SelectPostFormField = ({items}: SelectPostFormFieldProps) => {
    const form = useFormContext<LinkPostFormValues>()
    const {post} = usePost()
    const alreadyLinked = 'linkedEvents' in post ? post.linkedEvents : 'linkedNews' in post ? post.linkedNews : undefined
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
                                    <LinkPostDialogRadioItem id={item.id.toString()} key={item.id} value={item.id.toString()} disabled={alreadyLinkedSet.has(item.id)} post={item}/>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </FormItem>
                )
            }}
        />
    )
}
