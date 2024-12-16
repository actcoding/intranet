'server-only'

import sanitizeHtml from 'sanitize-html'

interface SanitizedHTMLContentProps {
    content: string;
    allowedTags?: string[];
    className?: string;
}

const SanitizedHTMLContent = (props: SanitizedHTMLContentProps) => {
    let content = props.content
    // Replace paragraphs with whitespace if they are not allowed
    if (!props.allowedTags?.includes('p')) {
        content = content.replace(/<p>/g, ' ').replace(/<\/p>/g, ' ')
    }
    return (
        <div
            className={props.className}
            dangerouslySetInnerHTML={{
                __html: sanitizeHtml(content, {
                    allowedTags: props.allowedTags,
                }),
            }}
        ></div>
    )
}

export default SanitizedHTMLContent
