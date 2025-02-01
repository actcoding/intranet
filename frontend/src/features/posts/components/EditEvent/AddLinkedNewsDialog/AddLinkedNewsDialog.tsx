import {
    AddLinkedNewsDialogClient,
} from '@/features/posts/components/EditEvent/AddLinkedNewsDialog/AddLinkedNewsDialog.client'
import {newsApi} from '@/lib/api/api'

export const AddLinkedNewsDialog = async () => {
    const {data} = await newsApi.newsIndex({perPage: 10})
    return (
        <AddLinkedNewsDialogClient initialSearchResults={data} />
    )
}
