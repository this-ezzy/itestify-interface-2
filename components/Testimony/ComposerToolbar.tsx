// components/Testimony/ComposerToolbar.tsx
'use client'

import { Editor } from '@tiptap/react'
import { AtSign, Code01, FaceSmile, Image03, LetterSpacing01, Strikethrough01, UserPlus01, UsersPlus } from '@untitled-ui/icons-react';
// import { Bold, Italic, Underline, List, Paperclip } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useState } from 'react';
// import TestimonyEditor from './TestimonyEditor';
import FellowshipSelect from './FellowshipSelect';
import { CustomToolTip } from '../shared';

interface Props {
    editor: Editor | null;
    onAttach: (files: FileList) => void
    setFellowshipId: (id: number) => void
}

export default function ComposerToolbar({ editor, onAttach, setFellowshipId }: Props) {
    const [openEmoji, setOpenEmoji] = useState(false)

    const btn = (active: boolean) =>
        `p-2 rounded ${active ? 'bg-gray-100' : ''}`

    useEffect(() => {
        const close = () => setOpenEmoji(false)
        window.addEventListener("click", close)
        return () => window.removeEventListener("click", close)
    }, [])

    if (!editor) return null
    return (
        <section className='text-neutral-800 font-light space-y-2'>
            {/* <div className="flex gap-2 bg-neutral-100 rounded-full px-2 w-fit">
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
            </div> */}
            <div className='flex items-center '>

                <CustomToolTip trigger={
                    <div className='p-2 flex items-center justify-center'>

                    <Image03 className='text-neutral-700 size-5' />
                    </div>

                }
                    content="Upload media"
                />

                    <input
                        type="file"
                        accept=''
                        multiple
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files) onAttach(e.target.files)
                        }}
                    />

                <div className='relative'>
                    <CustomToolTip trigger={<button
                        onClick={(e) => {
                            e.stopPropagation()
                            setOpenEmoji(!openEmoji)
                        }}
                        className='p-2'
                    >
                        <FaceSmile className='size-5 text-neutral-700' />
                    </button>}
                        content="Emoji"
                    />


                    {openEmoji && (
                        <div className='absolute bottom-full left-0 z-50'>
                            <EmojiPicker
                                onEmojiClick={(emojiData) => {
                                    editor.chain().focus().insertContent(emojiData.emoji).run()
                                    setOpenEmoji(false)
                                }}
                            />
                        </div>
                    )}
                </div>

                <CustomToolTip trigger={<button className='p-2'>
                    <UsersPlus className='size-5' />
                </button>}
                    content="Add collaborators"
                />


            </div>

            <FellowshipSelect onChange={setFellowshipId} />
            {/* <TestimonyEditor editor={editor} /> */}
        </section>
    )
}
