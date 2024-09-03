"use client";

import { Button } from "@/lib/components/common/Button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/lib/components/common/Popover";
import { Toggle } from "@/lib/components/common/Toggle";
import SelectImageForm from "./SelectImageForm";
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
import { v4 as uuidv4 } from "uuid";
import { createNewsFormSchema } from "@/lib/components/news/create-news-form/CreateNewsForm.config";
import { useForm, useFormContext, UseFormReturn } from "react-hook-form";
import { CreateNewsForm } from "@/lib/components/news/create-news-form/CreateNewsForm.models";

const CustomImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            "data-temp-id": {
                default: null,
                parseHTML: (element) => element.getAttribute("data-temp-id"),
                renderHTML: (attributes) => {
                    if (!attributes["data-temp-id"]) {
                        return {};
                    }
                    return {
                        "data-temp-id": attributes["data-temp-id"],
                    };
                },
            },
        };
    },
});

interface EditorProps {
    value?: string;
    onChange?: (value: string) => void;
}

const Editor = React.forwardRef((props: EditorProps, ref: React.Ref<any>) => {
    const editor = useEditor({
        extensions: [StarterKit, CustomImage],
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
    const form: CreateNewsForm = useFormContext();

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

                <SelectImageForm
                    onSubmit={(formData) => {
                        const tempId = uuidv4();
                        editor
                            ?.chain()
                            .focus()
                            .setImage({
                                src: URL.createObjectURL(formData.image),
                                "data-temp-id": tempId,
                            })
                            .run();
                        const currentImages = form.getValues("contentImages");
                        form.setValue("contentImages", [
                            ...(currentImages ?? []),
                            {
                                file: formData.image,
                            },
                        ]);
                    }}
                />
            </div>
            <EditorContent editor={editor} ref={ref} />
        </div>
    );
});

Editor.displayName = "Editor";

export default Editor;
