import { uploadNewsFileAction } from '@/lib/actions/news'
import { serializeFileData } from '@/lib/utils'

export async function updateAttachments(newsId: number, attachments: File[]) {
    const promises = attachments.map(async (file) => {
        return uploadNewsFileAction(
            newsId,
            'attachment',
            serializeFileData(file),
        )
    })

    return Promise.all(promises)
}
