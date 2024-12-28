import {Label} from '@/lib/components/common/Label'
import {RadioGroupItem} from '@/shared/components/RadioGroup'
import {RadioGroupItemProps} from '@radix-ui/react-radio-group'
import {ReactNode} from 'react'

interface ContentTypeFormFieldItemProps extends RadioGroupItemProps {
    children: ReactNode;
}

const DraftTypeFormFieldItem = ({
    children,
    ...props
}: ContentTypeFormFieldItemProps) => {
    return (
        <div>
            <RadioGroupItem className="peer sr-only" {...props} />
            <Label
                htmlFor={props.value}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 transition-all hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10"
            >
                {children}
            </Label>
        </div>
    )
}

export { DraftTypeFormFieldItem }
