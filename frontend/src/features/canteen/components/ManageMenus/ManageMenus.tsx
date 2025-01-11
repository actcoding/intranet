import {CreateMenuDialog, ManageMenuCard} from '@/features/canteen/components/ManageMenus'
import {MenuResource} from '@/lib/api/generated'
import {Button} from '@/lib/components/common/Button'
import {UtensilsIcon} from 'lucide-react'
import Link from 'next/link'

interface ManageMenusProps {
    menus: MenuResource[];
}

const ManageMenus = ({menus}: ManageMenusProps) => {
    return (
        <>
            <div className="flex gap-3">
                <h1 className="mb-4 flex-1 text-4xl font-semibold">Menüs</h1>
                <CreateMenuDialog />
                <Button asChild variant="outline">
                    <Link href={'/manage/canteen/dishes'}>
                        <UtensilsIcon size={16} className="mr-2"/>
                        Gerichte verwalten
                    </Link>
                </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
                {menus.map((menu, index) => (
                    <ManageMenuCard menu={menu} key={index} />
                ))}
            </div>
        </>
    )
}

export {ManageMenus}
