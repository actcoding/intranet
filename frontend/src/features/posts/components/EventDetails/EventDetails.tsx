import {EventDetailsHeader, EventDetailsInfo} from '@/features/posts/components/EventDetails'
import {Event} from '@/features/posts/types'
import FileListPreview from '@/lib/components/shared/FileListPreview'
import SanitizedHTMLContent from '@/lib/components/shared/SanitizedHTMLContent'

interface EventDetailsProps {
    event: Event
}

const EventDetails = async ({event}: EventDetailsProps) => {
    return (
        <div className="mx-auto h-full max-w-[800px]">
            <EventDetailsHeader event={event} />
            <EventDetailsInfo event={event} />
            <SanitizedHTMLContent
                content={event.content}
                allowedTags={[
                    'p',
                    'strong',
                    'em',
                    'a',
                    'ul',
                    'ol',
                    'li',
                    'img',
                ]}
            />

            <hr className="my-6" />
            {(event.attachments?.length ?? 0) > 0 ? (
                <FileListPreview
                    display='grid'
                    files={event.attachments.map((file) => file.data) ?? []}
                    download
                />
            ) : null}
        </div>
    )
}

export { EventDetails }
