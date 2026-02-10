'use client'

import { useState, useCallback, useEffect } from 'react'
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
import { toast } from 'sonner'
import Image from 'next/image'

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
    const [charCount, setCharCount] = useState(0)

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
        (
            options?: Partial<Pick<TestimonyPayload, "isDraft" | "scheduledAt">>
        ): TestimonyPayload => {
            const {
                isDraft = false,
                scheduledAt = null,
            } = options ?? {}

            return {
            title: title.trim(),
            body: content,
            topic: fellowshipId,
            files: attachments,
                isDraft,
                scheduledAt,
            }
        },
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
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
        const maxSize = 5 * 1024 * 1024 // 5MB

        const validFiles = Array.from(files).filter((file) => {
            if (!allowedTypes.includes(file.type)) {
                toast.error("Unsupported file type!!!")
                return false
            }
            if (file.size > maxSize) {
                toast.error("File size too large!!!")
                return false
            }
            return true
        })

        if (!validFiles.length) return

        const uploaded: UploadedAttachment[] = validFiles.map((file) => ({
            id: crypto.randomUUID(),
            file,
            name: file.name,
            size: file.size,
            mime: file.type,
            preview: URL.createObjectURL(file),
        }))

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
    useEffect(() => {
        if (!editor) return

        const updateCount = () => {
            setCharCount(editor.storage.characterCount.characters())
        }

        updateCount() // initial

        editor.on('update', updateCount)

        return () => {
            editor.off('update', updateCount)
        }
    }, [editor])


    useEffect(() => {
        return () => {
            attachments.forEach(f => URL.revokeObjectURL(f.preview))
        }
    }, [attachments])

    return (
        <CustomDialog
            isOpen={showTestimonyModal}
            onClose={close}
            disableClose={isPosting}
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
                            disabled={isPosting}
                        >
                            <XClose className="size-6" />
                        </Button>

                        <h2 className="text-xl font-semibold">Testify!</h2>
                    </div>

                    {onSaveDraft && (
                        <button
                            onClick={handleDraft}
                            className="text-sm text-neutral-600 font-medium "
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
                            <div
                                key={file.id}
                                className="relative border rounded-lg p-1 w-32 h-32 flex flex-col items-center justify-center"
                            >
                                <Image
                                    src={file.preview}
                                    alt={file.name}
                                    className="object-cover w-full h-full rounded-lg"
                                    width={70}
                                    height={70}

                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setAttachments((prev) =>
                                            prev.filter((f) => f.id !== file.id)
                                        )
                                    }
                                    className="absolute top-1 size-6 flex items-center justify-center text-sm right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                    ✕
                                </button>
                                <span className="text-xs mt-1 text-center truncate">{file.name}</span>
                            </div>
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
