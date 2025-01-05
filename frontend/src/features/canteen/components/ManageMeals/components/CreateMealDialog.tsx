'use client'

import { Button } from "@/lib/components/common/Button"
import { ResponsiveDialog, ResponsiveDialogContent, ResponsiveDialogTrigger } from "@/lib/components/common/ResponsiveDialog"
import { useToast } from "@/lib/components/hooks/use-toast"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const CreateMealDialog = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {refresh} = useRouter()
    const {toast} = useToast()
    
    return (
        <ResponsiveDialog>
            <ResponsiveDialogTrigger asChild>
                <Button>
                    <Plus className='mr-2'/>
                    Gericht erstellen
                </Button>
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent>
                <p>Test</p>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    )
}

export {CreateMealDialog}