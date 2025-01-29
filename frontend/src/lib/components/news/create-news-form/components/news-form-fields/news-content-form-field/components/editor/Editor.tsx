'use client'

import { Button } from '@/lib/components/common/Button'
import { inputVariants } from '@/lib/components/common/Input'
import { Toggle } from '@/lib/components/common/Toggle'
import { cn } from '@/lib/utils'
import TiptapImage from '@tiptap/extension-image'
import Image from 'next/image'
import { EditorContent, useEditor, ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { BoldIcon, ItalicIcon, Redo2Icon, Undo2Icon } from 'lucide-react'
import React from 'react'
import SelectImageForm from './SelectImageForm'
import { Node } from '@tiptap/pm/model'

const NextImageWrapper = (props: { node: Node }) => {
    return (
        <NodeViewWrapper>
            <Image
                src="/"
                alt='an image'
                width={720}
                height={720}
                {...props.node.attrs}
            />
        </NodeViewWrapper>
    )
}

const CustomImage = TiptapImage.extend({
    addNodeView() {
        return ReactNodeViewRenderer(NextImageWrapper)
    },
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
    onImageSelect?: (file: File, editor: any | null) => void;
}

const Editor = React.forwardRef((props: EditorProps, ref: React.Ref<any>) => {
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
                            props.onImageSelect?.(formData.image, editor)
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
