"use client";

import { Button } from "@/lib/components/common/Button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/lib/components/common/Popover";
import { Toggle } from "@/lib/components/common/Toggle";
import SelectImageForm from "@/lib/components/news/create-news-form/components/editor/SelectImageForm";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
    BoldIcon,
    ImageIcon,
    ItalicIcon,
    Redo2Icon,
    Undo2Icon,
} from "lucide-react";
import React from "react";

interface EditorProps {
    value?: string;
    onChange?: (value: string) => void;
}

const Editor = React.forwardRef((props: EditorProps, ref: React.Ref<any>) => {
    const editor = useEditor({
        extensions: [StarterKit, Image],
        content: props.value,
        onUpdate({ editor }) {
            props.onChange && props.onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "focus-visible:outline-none h-[500px] overflow-y-scroll",
            },
        },
    });

    return (
        <div className="flex flex-col min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <div className="flex gap-2 mb-2">
                <Toggle
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    pressed={editor?.isActive("bold")}
                >
                    <BoldIcon size={20} />
                </Toggle>
                <Toggle
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    pressed={editor?.isActive("italic")}
                >
                    <ItalicIcon size={20} />
                </Toggle>
                <Button
                    onClick={() => editor?.chain().focus().undo().run()}
                    disabled={!editor?.can().undo()}
                    size={"icon"}
                    variant={"ghost"}
                    type="button"
                >
                    <Undo2Icon size={20} />
                </Button>
                <Button
                    onClick={() => editor?.chain().focus().redo().run()}
                    disabled={!editor?.can().redo()}
                    size={"icon"}
                    variant={"ghost"}
                    type="button"
                >
                    <Redo2Icon size={20} />
                </Button>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                            <ImageIcon size={20} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <SelectImageForm
                            onSubmit={(formData) =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .setImage({ src: formData.imageUrl })
                                    .run()
                            }
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <EditorContent editor={editor} ref={ref} />
        </div>
    );
});

Editor.displayName = "Editor";

export default Editor;
