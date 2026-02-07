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
        <div className="p-3">
            <EditorContent editor={editor} placeholder='Share your testimony here for the world to hear...' />
        </div>
    )
}
