import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import * as React from 'react'

const inputVariants = cva(
    'flex h-10 w-full bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'rounded-md border border-input px-3 py-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                borderless: 'border-0 focus-visible:ring-0',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
)

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, variant, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(inputVariants({ variant, className }))}
                ref={ref}
                {...props}
            />
        )
    },
)
Input.displayName = 'Input'

export { Input, inputVariants }
