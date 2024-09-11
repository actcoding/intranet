'use client'

import { uploadNewsFileAction } from '@/lib/actions/news'
import { Button } from '@/lib/components/common/Button'
import { Toggle } from '@/lib/components/common/Toggle'
import { useNews } from '@/lib/components/news/provider'
import Image from '@tiptap/extension-image'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
    BoldIcon,
    ItalicIcon,
    Redo2Icon,
    Undo2Icon,
} from 'lucide-react'
import React from 'react'
import SelectImageForm from './SelectImageForm'
import { useToast } from '@/lib/components/hooks/use-toast'

const CustomImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            'data-temp-id': {
                default: null,
                parseHTML: (element) => element.getAttribute('data-temp-id'),
                renderHTML: (attributes) => {
                    if (!attributes['data-temp-id']) {
                        return {}
                    }
                    return {
                        'data-temp-id': attributes['data-temp-id'],
                    }
                },
            },
        }
    },
})

interface EditorProps {
    value?: string;
    onChange?: (value: string) => void;
}

const Editor = React.forwardRef((props: EditorProps, ref: React.Ref<any>) => {
    const { toast } = useToast()
    const editor = useEditor({
        extensions: [StarterKit, CustomImage],
        content: props.value,
        onUpdate({ editor }) {
            props.onChange && props.onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'focus-visible:outline-none h-[500px] overflow-y-scroll',
            },
        },
    })

    const news = useNews()

    return (
        <div className="flex min-h-[80px] w-full flex-col rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <div className="mb-2 flex gap-2">
                <Toggle
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    pressed={editor?.isActive('bold')}
                >
                    <BoldIcon size={20} />
                </Toggle>
                <Toggle
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    pressed={editor?.isActive('italic')}
                >
                    <ItalicIcon size={20} />
                </Toggle>
                <Button
                    onClick={() => editor?.chain().focus().undo().run()}
                    disabled={!editor?.can().undo()}
                    size={'icon'}
                    variant={'ghost'}
                    type="button"
                >
                    <Undo2Icon size={20} />
                </Button>
                <Button
                    onClick={() => editor?.chain().focus().redo().run()}
                    disabled={!editor?.can().redo()}
                    size={'icon'}
                    variant={'ghost'}
                    type="button"
                >
                    <Redo2Icon size={20} />
                </Button>

                <SelectImageForm
                    onSubmit={async (formData) => {
                        const uploadData = new FormData()
                        uploadData.set('file', formData.image)
                        const { error, data } = await uploadNewsFileAction(news.id, 'content', uploadData)

                        if (error) {
                            toast({
                                title: 'Fehler',
                                description: error.message,
                                variant: 'destructive',
                            })
                            return
                        }

                        editor
                            ?.chain()
                            .focus()
                            .setImage({
                                src: data?.url,
                            })
                            .run()
                    }}
                />
            </div>
            <EditorContent editor={editor} ref={ref} />
        </div>
    )
})

Editor.displayName = 'Editor'

export default Editor
