'use client'

import {Label} from '@/lib/components/common/Label'
import {cn} from '@/lib/utils'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import {Circle} from 'lucide-react'
import * as React from 'react'

const RadioGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn('grid gap-2', className)}
            {...props}
            ref={ref}
        />
    )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className,
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <Circle className="size-2.5 fill-current text-current" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

const RadioGroupItemCard = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>((props, ref) => {
    return (
        <div>
            <RadioGroupItem className="peer sr-only" {...props} ref={ref} />
            <Label
                htmlFor={props.value}
                className="flex flex-col justify-between rounded-md border-2 border-muted bg-popover p-4 transition-all hover:bg-accent hover:text-accent-foreground peer-disabled:opacity-40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10"
            >
                {props.children}
            </Label>
        </div>
    )
})
RadioGroupItemCard.displayName = 'RadioGroupItemCard'

export { RadioGroup, RadioGroupItem, RadioGroupItemCard }
