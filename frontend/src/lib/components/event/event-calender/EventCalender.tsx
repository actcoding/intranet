import { eventApi } from '@/lib/api/api'
import { EntityStatus } from '@/lib/api/generated'

type Props = {
    status?: EntityStatus
}

const EventCalender = async({ status } : Props) => {
    return <p>{status}</p>
}

export default EventCalender