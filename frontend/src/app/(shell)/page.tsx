import { Button } from '@/lib/components/common/Button'
import NewsListWidget from '@/lib/components/home/widgets/NewsListWidget'
import Spinner from '@/lib/components/shared/Spinner'
import { ChevronRightIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Home() {
    const t = await getTranslations('Index')

    return (
        <>
            <div className="grid gap-10 lg:grid-cols-5">
                <div className="col-span-3">
                    <div className="mb-3 flex justify-between">
                        <h2 className="text-2xl font-bold">{t('news')}</h2>
                        <Button
                            className="float-end"
                            variant="ghost"
                            asChild
                            size={'sm'}
                        >
                            <Link href="/news">
                                <span>{t('show-more-news')}</span>
                                <ChevronRightIcon size={20} />
                            </Link>
                        </Button>
                    </div>
                    <Suspense fallback={<Spinner />}>
                        <NewsListWidget />
                    </Suspense>
                </div>
                <div className="col-span-2">
                    <h2 className="mb-3 text-2xl font-bold">
                        {t('canteen-menu')}
                    </h2>
                    <p>Menu will be displayed here.</p>
                </div>
            </div>
        </>
    )
}
