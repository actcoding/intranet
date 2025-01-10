'use client'

import {deleteMenu} from '@/features/canteen/actions'
import {MenuResource} from '@/lib/api/generated'
import {Badge} from '@/lib/components/common/Badge'
import {Button} from '@/lib/components/common/Button'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/lib/components/common/Card'
import {useToast} from '@/lib/components/hooks/use-toast'
import {PencilIcon, Trash2Icon} from 'lucide-react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'

interface ManageMenuCardProps {
    menu: MenuResource
}

export const ManageMenuCard = ({menu}: ManageMenuCardProps) => {
    const {toast} = useToast()
    const {refresh} = useRouter()

    const handleDelete = async () => {
        try {
            await deleteMenu({menu: menu.id})
            toast({title: 'Menü gelöscht', description: `Das Menü "${menu.name}" wurde erfolgreich gelöscht`})
            refresh()
        } catch (e) {
            console.error(e)
            toast({title: 'Fehler', description: 'Es ist ein Fehler beim Löschen des Menüs aufgetreten', variant: 'destructive'})
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{menu.name}</CardTitle>
            </CardHeader>
            <CardContent>
                {/*<span>{`${menu.dishes?.length ?? 'Noch keine'} Gerichte`}</span> this is broken*/}
                {/*<DotIcon className="mx-1 inline-block" size={16} />*/}
                <Badge>{menu.nutrition === 'omnivorous' ? 'Mit Fleisch' : menu.nutrition === 'vegetarian' ? 'Vegetarisch' : 'Vegan' /* TODO: Mit next intl übersetzen */}</Badge>
            </CardContent>
            <CardFooter className="gap-2">
                <Button className="flex-1" variant="outline" asChild>
                    <Link href={`/manage/canteen/menus/${menu.id}`}>
                        <PencilIcon size={16} className="mr-2"/>
                        Bearbeiten
                    </Link>
                </Button>
                <Button variant="destructive" size="icon" onClick={handleDelete}><Trash2Icon size={16}/></Button>
            </CardFooter>
        </Card>
    )
}
