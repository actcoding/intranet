import { getAppSession } from '@/lib/actions/auth'
import { Button } from '@/lib/components/common/Button'
import { PlusIcon, Settings2Icon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Suspense } from 'react'

const EventsPage = async () => {
    const { sessionData } = await getAppSession()
    const t = await getTranslations()
    
    return ( 
        <>
            <div className="flex justify-between">
                <h1 className="mb-4 text-4xl font-semibold">
                    {t('Index.events')}
                </h1>
                {sessionData?.roles.includes('Creator') ? (
                    <div className="space-x-2">
                        <Button asChild>
                            <Link href="/manage/events/create">
                                <PlusIcon className="me-2" size={20} />
                                {t('Events.create')}
                            </Link>
                        </Button>
                        <Button asChild variant={'secondary'}>
                            <Link href="/manage/events">
                                <Settings2Icon className="me-2" size={20} />
                                {t('Events.manage')}
                            </Link>
                        </Button>
                    </div>
                ) : null}
            </div>
            <p>Todo: hier kommt noch stuff hin</p>
        </>
    )
}
 
export default EventsPage