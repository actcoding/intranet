import {Button} from '@/lib/components/common/Button'
import {Card, CardHeader, CardTitle} from '@/lib/components/common/Card'
import {ArrowRight, CalendarDaysIcon, NewspaperIcon} from 'lucide-react'
import Link from 'next/link'

const ManageOverview = () => {
    return (
        <>
            <h1 className="text-4xl font-semibold">Verwalten</h1>
            <div className="mt-3 grid gap-4 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <NewspaperIcon size={32} />
                            <CardTitle className="flex-1">Neuigkeiten</CardTitle>
                            <Button asChild>
                                <Link href="/manage/news">
                                    Verwalten <ArrowRight size={20} className="ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <CalendarDaysIcon size={32} />
                            <CardTitle className="flex-1">Veranstaltungen</CardTitle>
                            <Button asChild>
                                <Link href="/manage/events">
                                    Verwalten <ArrowRight size={20} className="ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </>
    )
}

export { ManageOverview }
