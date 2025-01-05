'use client'

import { Button } from '@/lib/components/common/Button'
import { Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface MealDeleteButtonProps {
    dishId: number
}

const MealDeleteButton = ({dishId}: MealDeleteButtonProps) => {
    const router = useRouter()
    return (
        <Button 
            variant="destructive" 
            size="icon"
            onClick={() => {
                console.log('test:' + dishId)
                router.refresh()
            }
            }
        >
            <Trash2Icon size={16}/>
        </Button>
    )
}

export default MealDeleteButton