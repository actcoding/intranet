import { EntityStatus } from '@/lib/api/generated'
import { Badge } from '@/lib/components/common/Badge'
import { useTranslations } from 'next-intl'

interface NewsStatusBadgeProps {
    status: EntityStatus;
}

const NewsStatusBadge = (props: NewsStatusBadgeProps) => {
    const t = useTranslations('News')
    switch (props.status) {
        case 'active':
            return (
                <Badge variant={'default'}>{t('news-status-published')}</Badge>
            )
        case 'draft':
            return (
                <Badge variant={'secondary'}>{t('news-status-draft')}</Badge>
            )
        case 'deleted':
            return (
                <Badge variant={'destructive'}>
                    {t('news-status-deleted')}
                </Badge>
            )
        default:
            return null
    }
}
export default NewsStatusBadge
