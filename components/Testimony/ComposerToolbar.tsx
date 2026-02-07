// components/Testimony/ComposerToolbar.tsx
'use client'

import { Editor } from '@tiptap/react'
import { AtSign, Code01, FaceSmile, LetterSpacing01, Strikethrough01, UserPlus01 } from '@untitled-ui/icons-react';
import { Bold, Italic, Underline, List, Paperclip } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';

export default function ComposerToolbar({ editor, onAttach }: { editor: Editor | null; onAttach: (files: FileList) => void }) {
    const [openEmoji, setOpenEmoji] = useState(false)
    if (!editor) return null

    const btn = (active: boolean) =>
        `p-2 rounded ${active ? 'bg-gray-100' : ''}`

    return (
        <section className='text-neutral-800 font-light space-y-2'>
            <div className="flex gap-2 bg-neutral-100 rounded-full px-2 w-fit">
                <button onClick={() => editor.chain().focus().toggleBold().run()}
                    className={btn(editor.isActive('bold'))}>
                    <Bold size={20} />
                </button>

                <button onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={btn(editor.isActive('italic'))}>
                    <Italic size={20} />
                </button>

                <button onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={btn(editor.isActive('underline'))}>
                    <Underline size={20} />
                </button>

                <button onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={btn(editor.isActive('strike'))}>
                    <Strikethrough01 className='size-5' />
                </button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={btn(editor.isActive('bulletList'))}>
                    <List size={20} />
                </button>
            </div>
            <div className='flex items-center gap-2'>
                <label className="cursor-pointer p-2">
                    <Paperclip size={20} />
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files) onAttach(e.target.files)
                        }}
                    />
                </label>
                <button className='p-2'>
                    <LetterSpacing01 className='size-5' />
                </button>
                <div className='relative'>
                    <button onClick={() => setOpenEmoji(!openEmoji)} className='p-2'>
                        <FaceSmile className='size-5' />
                    </button>
                    <div className='absolute bottom-full left-0'>
                        <EmojiPicker open={openEmoji} />
                    </div>
                </div>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={btn(editor.isActive('code'))}
                >
                    <Code01 className='size-5' />
                </button>


                <button className='p-2'>
                    <AtSign className='size-5' />
                </button>
                <button className='p-2'>
                    <UserPlus01 className='size-5' />
                </button>
            </div>
        </section>
    )
}
