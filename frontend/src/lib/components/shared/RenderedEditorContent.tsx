"server-only";

import StarterKit from "@tiptap/starter-kit";
import sanitizeHtml from "sanitize-html";

interface RenderedEditorContentProps {
    content: string;
    allowedTags?: string[];
}

const RenderedEditorContent = ({
    content,
    allowedTags = [],
}: RenderedEditorContentProps) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: sanitizeHtml(content, {
                    allowedTags,
                }),
            }}
        ></div>
    );
};

export default RenderedEditorContent;
