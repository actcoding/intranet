import {EditNews} from '@/features/posts/components/EditNews'
import {newsApi} from '@/lib/api/api'
import { Button } from '@/lib/components/common/Button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface EditNewsPageProps {
    params: {
        id: number;
    };
}

const EditNewsPage = async (props: EditNewsPageProps) => {
    const news = await newsApi.newsShow({ id: props.params.id })
    const files = await newsApi.newsUploadList({ id: props.params.id })
    const headerImage = files.find((file) => file.type === 'header')
    const attachments = files.filter((file) => file.type === 'attachment')

    return (<>
        <Button
            asChild
            size="sm"
            variant="link"
        >
            <Link href="/manage/news">
                <ArrowLeft />
                <span className="ml-1">
                    Zurück zu allen Neuigkeiten
                </span>
            </Link>
        </Button>

        <EditNews news={{...news, headerImage, attachments}} />
    </>)
}
export default EditNewsPage
