'use client'

import {updateDishAction} from '@/lib/actions/canteen'
import {DishResource, IngredientResource} from '@/lib/api/generated'
import {useToast} from '@/lib/components/hooks/use-toast'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import IngredientList from './components/IngredientList/IngredientList'
import ManageMealForm from './components/ManageMealForm/ManageMealForm'
import {MealFormValues} from './components/ManageMealForm/ManageMealForm.config'


interface MealEditorProps {
    meal: DishResource
}

const MealEditor = ({meal}: MealEditorProps) => {

    const {refresh} = useRouter()
    const {toast} = useToast()

    const [ingredients, setIngredients] = useState<IngredientResource[]>(meal.notes ?? [])


    const addIngredient = (newIngredient: IngredientResource) => {
        if(!ingredients.find((item) => item.id === newIngredient.id)) {
            const updatedIngredients = [...ingredients, newIngredient]
            setIngredients(updatedIngredients)
        }
    }

    const deleteIngredient = (deleteId: number) => {
        const updatedIngredients = ingredients.filter((ingredient) => ingredient.id !== deleteId)
        setIngredients(updatedIngredients)
    }

    const onSubmit = async (values: MealFormValues) => {
        try {
            const ingredientIds = ingredients.map((ingredient) => ingredient.id)
            await updateDishAction({
                dish: meal.id ?? -1,
                dishUpdateRequest: {
                    name: values.name,
                    summary: values.summary,
                    type: values.type,
                    ingredients: ingredientIds,
                },
            })
            toast({
                title: 'Gericht erstellt',
                description: `Das Gericht "${values.name}" wurde erfolgreich aktualisiert`,
            })
            refresh()
        } catch (error) {
            console.error('Dish update failed:', error)
            toast({
                title: 'Fehler',
                description: 'Es ist ein Fehler beim Aktualisieren des Gerichts aufgetreten',
                variant: 'destructive',
            })
        }
    }

    return (
        <>
            <h1 className="mb-4 text-4xl font-semibold">{`${meal.name} bearbeiten`}</h1>
            <div className='grid grid-cols-1 items-start gap-5 md:grid-cols-5'>
                <div className='col-span-2'>
                    <ManageMealForm
                        meal={meal}
                        handleSubmit={onSubmit}
                    />
                </div>
                <div className='col-span-3'>
                    <IngredientList
                        ingredients={ingredients}
                        addIngredient={addIngredient}
                        deleteIngredient={deleteIngredient}
                    />
                </div>
            </div>
        </>
    )
}

export default MealEditor
