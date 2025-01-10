'use client'

import {deleteDish} from '@/features/canteen/actions'
import {Button} from '@/lib/components/common/Button'
import {useToast} from '@/lib/components/hooks/use-toast'
import {Trash2Icon} from 'lucide-react'
import {useRouter} from 'next/navigation'

interface MealDeleteButtonProps {
    dishId: number
}

const MealDeleteButton = ({dishId}: MealDeleteButtonProps) => {
    const router = useRouter()
    const {toast} = useToast()

    const handleDelete = async () => {
        await deleteDish({dish: dishId})
        toast({
            title: 'Gericht gelöscht',
            description: 'Das Gericht wurde erfolgreich gelöscht',
        })
        router.refresh()
    }

    return (
        <Button
            variant="destructive"
            size="icon"
            onClick={handleDelete}
        >
            <Trash2Icon size={16}/>
        </Button>
    )
}

export default MealDeleteButton
