import { newsApi } from '@/lib/api/api'
import { News } from '@/lib/api/generated'
import { Button } from '@/lib/components/common/Button'
import FileListPreview from '@/lib/components/shared/FileListPreview'
import {
    FileSelector,
    FileSelectorBody,
    FileSelectorContent,
    FileSelectorFooter,
    FileSelectorHeader,
    FileSelectorInput,
    FileSelectorTitle,
    FileSelectorTrigger,
} from '@/lib/components/shared/FileSelector'
import { PlusIcon } from 'lucide-react'

interface NewsAttachmentsFormFieldProps {
    news: News
}

export async function NewsAttachmentsFormField ({ news }: NewsAttachmentsFormFieldProps) {
    const files: File[] = await newsApi.newsUploadList({
        news: news.id,
        type: 'attachment',
    })

    const onChange = async (files: File[]) => {
        console.log(files)
    }

    return (
        <div className='space-y-2'>
            <p className="text-sm font-medium leading-none">
                Anhänge
            </p>

            <FileSelector
                // onPreviewChange={files => setFiles(files ?? [])}
                // onChange={onChange}
                multiple
            >
                <FileSelectorTrigger asChild>
                    <Button variant={'outline'}>
                        <PlusIcon size={16} className="mr-2" />
                        Anhänge hinzufügen
                    </Button>
                </FileSelectorTrigger>
                <FileSelectorContent>
                    <FileSelectorHeader>
                        <FileSelectorTitle>
                            Anhänge hinzufügen
                        </FileSelectorTitle>
                    </FileSelectorHeader>
                    <FileSelectorBody>
                        <FileSelectorInput />
                    </FileSelectorBody>
                    <FileSelectorFooter />
                </FileSelectorContent>
            </FileSelector>

            <FileListPreview
                display='grid'
                files={files.map(file => file.data)}
            />
        </div>
    )
}
