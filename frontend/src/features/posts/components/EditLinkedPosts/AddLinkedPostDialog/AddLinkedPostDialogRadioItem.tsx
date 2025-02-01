import {Post} from '@/features/posts/types'
import {Label} from '@/lib/components/common/Label'
import {RadioGroupItem} from '@/shared/components/RadioGroup'
import {RadioGroupItemProps} from '@radix-ui/react-radio-group'

interface EditLinkedPostsDialogRadioItemProps extends RadioGroupItemProps {
    post: Post;
}
const AddLinkedPostDialogRadioItem = ({post, ...props}: EditLinkedPostsDialogRadioItemProps) => {
    return (
        <div>
            <RadioGroupItem className="peer sr-only" {...props} />
            <Label
                htmlFor={props.value}
                className="flex flex-col justify-between rounded-md border-2 border-muted bg-popover p-4 transition-all hover:bg-accent hover:text-accent-foreground peer-disabled:opacity-40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10"
            >
                <p>{post.title}</p>
            </Label>
        </div>
    )
}

export { AddLinkedPostDialogRadioItem }
