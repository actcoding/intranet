import {
    AddLinkedEventDialogClient,
} from '@/features/posts/components/EditNews/AddLinkedEventDialog/AddLinkedEventDialog.client'
import {eventApi} from '@/lib/api/api'

export const AddLinkedEventDialog = async () => {
    const {data} = await eventApi.eventIndex({perPage: 10})
    return (
        <AddLinkedEventDialogClient initialSearchResults={data} />
    )
}
