import { uploadNewsFileAction } from '@/lib/actions/news'
import { serializeFileData } from '@/lib/utils'

export function updateAttachments(newsId: number, attachments: File[]) {
    attachments.forEach(async (file) => {
        return uploadNewsFileAction(
            newsId,
            'attachment',
            serializeFileData(file),
        )
    })
}
