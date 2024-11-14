'use client'

import { uploadNewsFileAction } from '@/lib/actions/news'
import { Button } from '@/lib/components/common/Button'
import { inputVariants } from '@/lib/components/common/Input'
import { Toggle } from '@/lib/components/common/Toggle'
import { useToast } from '@/lib/components/hooks/use-toast'
import { useNews } from '@/lib/components/news/provider'
import { cn } from '@/lib/utils'
import Image from '@tiptap/extension-image'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { BoldIcon, ItalicIcon, Redo2Icon, Undo2Icon } from 'lucide-react'
import React from 'react'
import SelectImageForm from './SelectImageForm'

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
                class: cn(
                    inputVariants({ variant: 'borderless' }),
                    'flex h-full min-h-[200px] w-full flex-col',
                ),
            },
        },
    })

    const news = useNews()

    return (
        <>
            <div className="sticky top-2 z-50 flex justify-between rounded-lg border border-input bg-background p-1 shadow">
                <div className="flex">
                    <Toggle
                        onClick={() =>
                            editor?.chain().focus().toggleBold().run()
                        }
                        pressed={editor?.isActive('bold')}
                    >
                        <BoldIcon size={20} />
                    </Toggle>
                    <Toggle
                        onClick={() =>
                            editor?.chain().focus().toggleItalic().run()
                        }
                        pressed={editor?.isActive('italic')}
                    >
                        <ItalicIcon size={20} />
                    </Toggle>
                    <SelectImageForm
                        onSubmit={async (formData) => {
                            const uploadData = new FormData()
                            uploadData.set('file', formData.image)
                            const { error, data } = await uploadNewsFileAction(
                                news.id,
                                'content',
                                uploadData,
                            )

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
                                    // TODO: Better types
                                    src: data!.url,
                                })
                                .run()
                        }}
                    />
                </div>
                <div>
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
                </div>
            </div>
            <EditorContent editor={editor} ref={ref} />
        </>
    )
})

Editor.displayName = 'Editor'

export default Editor
