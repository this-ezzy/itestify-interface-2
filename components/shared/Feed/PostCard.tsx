// components/PostCard.tsx
'use client'

import { CelebrateIcon, ChatCircle, KeyIcon, ShareIcon } from "../Icons"
import { cn } from "@/lib/utils"
import { Bookmark, EyeOff, Flag03, MedicalCross } from "@untitled-ui/icons-react"
import CustomDropDown from "../CustomDropDown"
import { useState, useMemo } from "react"
import DOMPurify from "dompurify"
import MediaGallery from "./MediaGallery"
import { estimateReadTime } from "@/utils/readTime"
import CustomImage from "../CustomImage/CustomImage"

export type CardType = "compact" | "card"

export interface TestimonyMedia {
    path: string
    type: "image" | "video" | string
    url: string
}

type PostCardProps = {
    readonly author: string
    readonly avatarUrl?: string
    readonly title: string
    readonly excerpt: string
    readonly media?: TestimonyMedia[]
    readonly category?: string
    readonly className?: string
    readonly cardType?: CardType
    readonly imageClassName?: string
    readonly bodyClassName?: string
    readonly showFullBody?: boolean
}

export default function PostCard({
    author,
    avatarUrl,
    title,
    excerpt,
    media = [],
    category,
    className,
    imageClassName,
    bodyClassName,
    showFullBody,
    cardType = "card"
}: PostCardProps) {
    const isCompact = cardType === "compact"
    const isCard = cardType === "card"
    const [action, setAction] = useState<string | null>(null)

    const handleAction = (value: string) => {
        setAction(value)
        console.log(value)
    }

    /*
     --------------------------------------------------
     Media helpers
     --------------------------------------------------
    */
    const { firstImage } = useMemo(() => {
        const images = media.filter((m) => m.type === "image")
        const videos = media.filter((m) => m.type === "video")

        return {
            images,
            videos,
            firstImage: images[0]?.url,
            hasMedia: images.length > 0 || videos.length > 0
        }
    }, [media])

    const readTime = estimateReadTime(excerpt)

    return (
        <article
            className={cn(
                "w-full max-w-full flex items-start gap-2 border-t",
                className
            )}
        >
            {/* ------------------ Compact thumbnail ------------------ */}
            <div
                className={cn(
                    isCompact && firstImage
                        ? "mr-2 h-14 w-18 shrink-0 overflow-hidden rounded-lg"
                        : "hidden"
                )}
            >
                {isCompact && <MediaGallery media={media} variant="compact" />}

            </div>

            {/* ------------------ Body ------------------ */}
            <section className="w-full min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <CustomImage
                            src={avatarUrl ?? "/assets/Avatars Default with Backdrop.svg"}
                            alt={author}
                            width={32}
                            height={32}
                            className="rounded-full shrink-0"
                        />

                        <div className="text-sm flex gap-2 items-center">
                            <span className="font-medium text-neutral-900">
                                {author}
                            </span>
                            <div className="text-gray-400">{readTime}min </div>
                        </div>
                    </div>

                    <CustomDropDown
                        value={action}
                        align="end"
                        onChange={handleAction}
                        items={[
                            { value: "save", icon: <Bookmark />, label: <>Save</> },
                            { value: "hide", icon: <EyeOff />, label: <>Hide</> },
                            { value: "report", icon: <Flag03 />, label: <>Report</> }
                        ]}
                        renderTrigger={() => (
                            <button className="text-gray-400 hover:text-gray-600 rotate-90 relative z-30">
                                •••
                            </button>
                        )}
                        contentClassName="min-w-[180px] z-30"
                    />
                </div>

                {/* Category */}
                {category && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                        <MedicalCross />
                        <span>{category}</span>
                    </div>
                )}

                {/* Title */}
                <h2 className="mt-3 text-base md:text-lg font-semibold text-neutral-800">
                    {title}
                </h2>

                <div className={cn(bodyClassName)}>
                    {/* ------------------ Media Gallery ------------------ */}
                    {isCard && <MediaGallery media={media} variant="card" imageClassName={imageClassName} />}

                    {/* ------------------ Excerpt ------------------ */}
                    <div
                        className={cn("mt-3 text-sm text-neutral-500 line-clamp-3", showFullBody && "line-clamp-none")}
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(excerpt)
                        }}
                    />

                    {/* ------------------ Actions ------------------ */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        <ActionButton
                            label="Celebrate"
                            icon={<CelebrateIcon />}
                        />
                        <ActionButton icon={<ChatCircle />} />
                        <ActionButton icon={<KeyIcon />} className="px-1 py-1 size-7!" />
                        <ActionButton label="Share" icon={<ShareIcon />} />
                    </div>
                </div>
            </section>
        </article>
    )
}

function ActionButton({
    label,
    icon,
    className
}: {
    readonly label?: string
    readonly icon?: React.ReactNode
    readonly className?: string
}) {
    return (
        <button
            className={cn(
                "flex items-center justify-center cursor-pointer gap-1 rounded-full border px-4 py-1 text-sm text-neutral-700 hover:bg-neutral-50",
                className
            )}
        >
            {icon}
            {label}
        </button>
    )
}
