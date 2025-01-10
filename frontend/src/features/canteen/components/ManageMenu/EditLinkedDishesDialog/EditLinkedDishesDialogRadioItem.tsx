import {DishResource} from '@/lib/api/generated'
import {Label} from '@/lib/components/common/Label'
import {RadioGroupItem} from '@/shared/components/RadioGroup'
import {RadioGroupItemProps} from '@radix-ui/react-radio-group'

interface EditLinkedDishesDialogRadioItemProps extends RadioGroupItemProps {
    dish: DishResource;
}
const EditLinkedDishesDialogRadioItem = ({dish, ...props}: EditLinkedDishesDialogRadioItemProps) => {
    return (
        <div>
            <RadioGroupItem className="peer sr-only" {...props} />
            <Label
                htmlFor={props.value}
                className="flex flex-col justify-between rounded-md border-2 border-muted bg-popover p-4 transition-all hover:bg-accent hover:text-accent-foreground peer-disabled:opacity-40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10"
            >
                <p>{dish.name}</p>
            </Label>
        </div>
    )
}

export { EditLinkedDishesDialogRadioItem }
