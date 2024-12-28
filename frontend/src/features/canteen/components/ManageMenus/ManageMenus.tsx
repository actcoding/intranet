import {Badge} from '@/lib/components/common/Badge'
import {Button} from '@/lib/components/common/Button'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/lib/components/common/Card'
import {DotIcon, PencilIcon, Trash2Icon} from 'lucide-react'
import Link from 'next/link'

interface ManageMenusProps {
    menus: any[];
}

const ManageMenus = ({menus}: ManageMenusProps) => {
    return (
        <>
            <div className="flex justify-between gap-3">
                <h1 className="mb-4 text-4xl font-semibold">Menüs</h1>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
                {menus.map((menu, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{menu.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span>{`${menu.meals.length} Speisen`}</span>
                            <DotIcon className="mx-1 inline-block" size={16} />
                            <Badge>{menu.nutrition /* TODO: Mit next intl übersetzen */}</Badge>
                        </CardContent>
                        <CardFooter className="gap-2">
                            <Button className="flex-1" variant="outline" asChild>
                                <Link href={`/manage/canteen/menus/${menu.id}`}>
                                    <PencilIcon size={16} className="mr-2"/>
                                    Bearbeiten
                                </Link>
                            </Button>
                            <Button variant="destructive" size="icon"><Trash2Icon size={16}/></Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    )
}

export {ManageMenus}
