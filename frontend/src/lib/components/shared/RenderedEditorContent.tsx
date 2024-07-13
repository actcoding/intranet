"server-only";

import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import sanitizeHtml from "sanitize-html";

interface RenderedEditorContentProps {
    content: JSON;
    allowedTags?: string[];
}

const RenderedEditorContent = ({
    content,
    allowedTags = [],
}: RenderedEditorContentProps) => {
    return sanitizeHtml(generateHTML(content, [StarterKit]), {
        allowedTags,
    });
};

export default RenderedEditorContent;
