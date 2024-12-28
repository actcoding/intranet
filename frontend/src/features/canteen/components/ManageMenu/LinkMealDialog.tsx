import {Button} from '@/lib/components/common/Button'
import {
    ResponsiveDialog,
    ResponsiveDialogContent,
    ResponsiveDialogFooter,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogTrigger,
} from '@/lib/components/common/ResponsiveDialog'
import {PlusCircleIcon} from 'lucide-react'

interface LinkMealDialogProps {
    menu: any;
}

const LinkMealDialog = ({menu}: LinkMealDialogProps) => {

    // ähnliche Lösung wie bei LinkNews/LinkEvent
    return (
        <ResponsiveDialog>
            <ResponsiveDialogTrigger asChild>
                <Button className="size-full" variant="outline">
                    <PlusCircleIcon className="mr-2" />
                    Speise hinzufügen
                </Button>
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent>
                <ResponsiveDialogHeader>
                    <ResponsiveDialogTitle>
                        Speise hinzufügen
                    </ResponsiveDialogTitle>
                </ResponsiveDialogHeader>
                <ResponsiveDialogFooter>
                    <Button>Bestätigen</Button>
                </ResponsiveDialogFooter>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    )
}

export { LinkMealDialog }
