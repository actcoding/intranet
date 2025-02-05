'use client'

import {MealFormProvider} from '@/features/canteen/contexts/MealFormContext'
import {createDishAction} from '@/lib/actions/canteen'
import {Button} from '@/lib/components/common/Button'
import {
    ResponsiveDialog,
    ResponsiveDialogBody,
    ResponsiveDialogContent,
    ResponsiveDialogFooter,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogTrigger,
} from '@/lib/components/common/ResponsiveDialog'
import {useToast} from '@/lib/components/hooks/use-toast'
import {FormSubmitButton} from '@/shared/components/FormSubmitButton'
import {Plus} from 'lucide-react'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import {MealFormValues} from '../../../ManageMeal/components/ManageMealForm/ManageMealForm.config'
import {MealNameFormField} from './MealNameFormField'
import {MealSummaryFormField} from './MealSummaryFormField'
import {MealTypeFormField} from './MealTypeFormField'

const CreateMealDialog = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {refresh} = useRouter()
    const {toast} = useToast()

    const defaultValues: MealFormValues = {
        name: '',
        summary: '',
        type: 'main',
        lowCarb: false,
    }

    const handleSubmit = async (values: MealFormValues) => {
        try {
            await createDishAction({
                dishStoreRequest: {
                    name: values.name,
                    summary: values.summary,
                    type: values.type,
                    ingredients: [],
                },
            })
            setIsOpen(false)
            toast({
                title: 'Gericht erstellt',
                description: `Das Gericht "${values.name}" wurde erfolgreich erstellt`,
            })
            refresh()
        } catch (e) {
            console.error(e)
            toast({
                title: 'Fehler',
                description: 'Es ist ein Fehler beim Erstellen des Gerichts aufgetreten',
                variant: 'destructive',
            })
        }
    }

    return (
        <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
            <ResponsiveDialogTrigger asChild>
                <Button>
                    <Plus className='mr-2' size={16} />
                    Gericht erstellen
                </Button>
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent>
                <MealFormProvider
                    onSubmit={handleSubmit}
                    defaultValues={defaultValues}
                >
                    <ResponsiveDialogHeader>
                        <ResponsiveDialogTitle>Gericht erstellen</ResponsiveDialogTitle>
                    </ResponsiveDialogHeader>
                    <ResponsiveDialogBody className='space-y-2 py-3'>
                        <MealNameFormField />
                        <MealSummaryFormField />
                        <MealTypeFormField />
                    </ResponsiveDialogBody>
                    <ResponsiveDialogFooter>
                        <FormSubmitButton>Erstellen</FormSubmitButton>
                    </ResponsiveDialogFooter>
                </MealFormProvider>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    )
}

export {CreateMealDialog}
