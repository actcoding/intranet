'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { useToast } from '@/lib/components/hooks/use-toast'
import { Button } from '@/lib/components/common/Button' 
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/lib/components/common/Command'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/lib/components/common/Form'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/lib/components/common/Popover'
import { useEffect, useState } from 'react'
import { canteenApi } from '@/lib/api/api'
import { IngredientResource } from '@/lib/api/generated'

const FormSchema = z.object({
    id: z.number({
        required_error: 'Please select an ingredient.',
    }),
})

interface ComboBoxFormProps {
    handleSubmit: (ingredient: IngredientResource) => void
}

export function ComboboxForm({handleSubmit}: ComboBoxFormProps) {
    const [ingredients, setIngredients] = useState<IngredientResource[]>([])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await canteenApi.ingredientIndex()
                setIngredients(response)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })


    function onSubmit(data: z.infer<typeof FormSchema>) {
        const ingredient = ingredients.filter((ingredient) => ingredient.id === data.id)[0]
        handleSubmit(ingredient)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <div className="flex space-x-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    'w-[200px] justify-between',
                                                    !field.value && 'text-muted-foreground',
                                                )}
                                            >
                                                {field.value
                                                    ? ingredients.find(
                                                        (ingredient) => ingredient.id === field.value,
                                                    )?.name
                                                    : 'Zutat wählen'}
                                                <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search language..." />
                                            <CommandList>
                                                <CommandEmpty>Keine Zutaten gefunden</CommandEmpty>
                                                <CommandGroup>
                                                    {ingredients.map((ingredient) => (
                                                        <CommandItem
                                                            value={ingredient.name}
                                                            key={ingredient.id}
                                                            onSelect={() => {
                                                                form.setValue('id', ingredient.id)
                                                            }}
                                                        >
                                                            {ingredient.name}
                                                            <Check
                                                                className={cn(
                                                                    'ml-auto',
                                                                    ingredient.id === field.value
                                                                        ? 'opacity-100'
                                                                        : 'opacity-0',
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <Button type="submit">Hinzufügen</Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
