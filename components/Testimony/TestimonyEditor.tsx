// TestimonyEditor.tsx
'use client'
import { EditorContent, Editor } from '@tiptap/react'

export default function TestimonyEditor({
    editor
}: Readonly<{
    editor: Editor | null
}>) {
    if (!editor) return null

    return (
        <div className="px-3 overflow-auto">
            <EditorContent editor={editor} autoFocus={true} />
        </div>
    )
}
