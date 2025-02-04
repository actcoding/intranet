'server-only'

import {cn} from '@/lib/utils'
import sanitizeHtml from 'sanitize-html'

interface SanitizedHTMLContentProps {
    content: string;
    allowedTags?: string[];
    className?: string;
}

const SanitizedHTMLContent = (props: SanitizedHTMLContentProps) => {
    let content = props.content
    const areParagraphsAllowed = props.allowedTags?.includes('p')
    // Replace paragraphs with whitespace if they are not allowed
    if (!areParagraphsAllowed) {
        content = content.replace(/<p>/g, ' ').replace(/<\/p>/g, ' ')
    }
    return (
        <div
            className={cn(props.className, areParagraphsAllowed ? '[&_p:empty]:h-4 [&_p:empty]:my-2' : '')}
            dangerouslySetInnerHTML={{
                __html: sanitizeHtml(content, {
                    allowedTags: props.allowedTags,
                }),
            }}
        ></div>
    )
}

export default SanitizedHTMLContent
