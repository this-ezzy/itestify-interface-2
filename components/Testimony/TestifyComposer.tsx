'use client'

import { useState, useCallback } from 'react'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

import FellowshipSelect from './FellowshipSelect'
import TitleInput from './TitleInput'
import TestimonyEditor from './TestimonyEditor'
import ComposerToolbar from './ComposerToolbar'
import FooterActions from './FooterActions'
import CustomDialog from '../shared/Modals/CustomDialog'

import { useAppDispatch, useAppSelector } from '@/Redux/store'
import { toggleTestimonyModal } from '@/Redux/Slices/testimonySlice'

import { Button } from '../ui/button'
import { XClose } from '@untitled-ui/icons-react'
import { TestimonyPayload, UploadedAttachment } from '@/app/api/hooks/testimony/types'

import CharacterCount from '@tiptap/extension-character-count'

interface Props {
    onPost: (payload: TestimonyPayload) => Promise<void>
    onSaveDraft?: (payload: TestimonyPayload) => void
    onSchedule?: (payload: TestimonyPayload) => void
    isPosting?: boolean
}

export default function TestifyComposer({
    onPost,
    onSaveDraft,
    onSchedule,
    isPosting
}: Readonly<Props>) {

    const dispatch = useAppDispatch()
    const { showTestimonyModal } = useAppSelector((s) => s.testimony)

    /* --------------------------------- STATE -------------------------------- */

    const [title, setTitle] = useState('')
    const [fellowshipId, setFellowshipId] = useState<number | undefined>()
    const [attachments, setAttachments] = useState<UploadedAttachment[]>([])

    /* --------------------------------- EDITOR -------------------------------- */

    const editor = useEditor({
        extensions: [StarterKit, Underline, CharacterCount],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose max-w-none min-h-[220px] outline-none'
            }
        },
        immediatelyRender: false
    })

    const content = editor?.getHTML() ?? ''

    /* --------------------------------- HELPERS -------------------------------- */

    const buildPayload = useCallback(
        (extra?: Partial<TestimonyPayload>): TestimonyPayload => ({
            title: title.trim(),
            body: content,
            topic: fellowshipId,
            files: attachments,
            isDraft: false,
            scheduledAt: null,
            ...extra
        }),
        [title, content, fellowshipId, attachments]
    )

    const resetForm = () => {
        setTitle('')
        setAttachments([])
        setFellowshipId(undefined)
        editor?.commands.clearContent()
    }

    const close = () => {
        dispatch(toggleTestimonyModal())
        resetForm()
    }

    /* --------------------------------- ATTACH -------------------------------- */

    async function handleAttach(files: FileList) {
        const uploaded: UploadedAttachment[] = await Promise.all(
            Array.from(files).map(async (file) => {
                // 👉 plug your upload API here
                const url = URL.createObjectURL(file)

                return {
                    id: crypto.randomUUID(),
                    url,
                    name: file.name,
                    size: file.size,
                    mime: file.type
                }
            })
        )

        setAttachments((prev) => [...prev, ...uploaded])
    }

    /* --------------------------------- ACTIONS -------------------------------- */

    const handlePost = async () => {
        await onPost(buildPayload())
        close()
    }

    const handleDraft = () => {
        onSaveDraft?.(buildPayload({ isDraft: true }))
    }

    const handleSchedule = () => {
        onSchedule?.(buildPayload({ scheduledAt: new Date().toISOString() }))
    }

    const disabled = !title.trim() || !content.trim() || isPosting

    /* --------------------------------- UI -------------------------------- */

    const charCount = editor?.storage?.characterCount?.characters() ?? 0

    return (
        <CustomDialog
            isOpen={showTestimonyModal}
            onClose={close}
            disableOutsideClick
            showCloseButton={false}
            contentClassName="md:max-w-[650px] w-full p-5 overflow-auto"
            customHeader={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Button
                            variant="secondary"
                            className="size-9!"
                            onClick={close}
                        >
                            <XClose className="size-6" />
                        </Button>

                        <h2 className="text-xl font-semibold">Testify!</h2>
                    </div>

                    {onSaveDraft && (
                        <button
                            onClick={handleDraft}
                            className="text-sm text-neutral-600 font-medium hover:text-black"
                        >
                            Drafts
                        </button>
                    )}
                </div>
            }
        >
            <div className="space-y-4">

                <FellowshipSelect onChange={setFellowshipId} />

                <TitleInput
                    value={title}
                    onChange={setTitle}
                />

                <TestimonyEditor editor={editor} />

                {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {attachments.map((file) => (
                            <span
                                key={file.id}
                                className="px-3 py-2 border rounded-lg text-sm"
                            >
                                📎 {file.name}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex justify-between items-center h-20">
                    <ComposerToolbar editor={editor} onAttach={handleAttach} />

                    <FooterActions
                        disabled={disabled}
                        onPost={handlePost}
                        onSchedule={handleSchedule}
                        isPosting={isPosting}
                        charCount={charCount}
                    />
                </div>
            </div>
        </CustomDialog>
    )
}
