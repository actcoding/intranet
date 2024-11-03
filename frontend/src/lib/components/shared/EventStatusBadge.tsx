import { EntityStatus } from '@/lib/api/generated'
import { Badge } from '@/lib/components/common/Badge'
import { useTranslations } from 'next-intl'

interface EventStatusBadgeProps {
    status: EntityStatus;
}

const EventStatusBadge = (props: EventStatusBadgeProps) => {
    const t = useTranslations('Event')
    switch (props.status) {
        case 'active':
            return (
                <Badge variant={'default'}>{t('event-status-published')}</Badge>
            )
        case 'draft':
            return (
                <Badge variant={'secondary'}>{t('event-status-draft')}</Badge>
            )
        case 'deleted':
            return (
                <Badge variant={'destructive'}>
                    {t('event-status-deleted')}
                </Badge>
            )
        default:
            return null
    }
}
export default EventStatusBadge
