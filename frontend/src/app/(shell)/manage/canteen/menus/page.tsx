import {ManageMenus} from '@/features/canteen/components/ManageMenus'

const ManageMenusPage = () => {
    const menus = [
        {
            id: 1,
            nutrition: 'omnivorous',
            name: 'Schnitzelmenü 1',
            meals: [
                {
                    id: 1,
                    name: 'Schnitzel ungarische Art',
                    summary: 'Schnitzel mit pikanter Tomatensauce, dazu Pommes und Salat',
                    type: 'main',
                    notes: [
                        {
                            id: 1,
                            name: 'Nüsse',
                            type: 'allergen',
                        },
                    ],
                },
                {
                    id: 2,
                    name: 'Himbeerdpudding',
                    summary: 'Lockerer Himbeer-Sahne-Pudding',
                    type: 'dessert',
                    notes: [
                        {
                            id: 2,
                            name: 'Gluten',
                            type: 'allergen',
                        },
                    ],
                },
            ],
        },
    ]

    return (
        <ManageMenus menus={menus} />
    )
}

export default ManageMenusPage
