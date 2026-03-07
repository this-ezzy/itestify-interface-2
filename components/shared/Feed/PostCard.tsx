// components/PostCard.tsx
'use client'

import { CelebrateIcon, ChatCircle } from "../Icons"
import { cn } from "@/lib/utils"
import { Bookmark, EyeOff, Flag03, MedicalCross, Share06 } from "@untitled-ui/icons-react"
import CustomDropDown from "../CustomDropDown"
import { useState, useMemo } from "react"
import DOMPurify from "dompurify"
import MediaGallery from "./MediaGallery"
import { estimateReadTime } from "@/utils/readTime"
import CustomImage from "../CustomImage/CustomImage"
import { useBookmarkTestimony, useDisLikeTestimony, useLikeTestimony, useRemoveBookmarkTestimony } from "@/app/api/hooks/testimony"
import { Loader2 } from "lucide-react"
import { Testimony } from "@/app/api/hooks/testimony/types"
import useAuthenticateUser from "@/hooks/useAuthenticateUser"

export type CardType = "compact" | "card"
export type ActionType = "save" | "hide" | "report"
export interface TestimonyMedia {
    path: string
    type: "image" | "video" | string
    url: string
}

type PostCardProps = {
    readonly className?: string
    readonly cardType?: CardType
    readonly imageClassName?: string
    readonly bodyClassName?: string
    readonly showFullBody?: boolean
    readonly testimony: Testimony
}

export default function PostCard({
    className,
    imageClassName,
    bodyClassName,
    showFullBody,
    testimony,
    cardType = "card"
}: PostCardProps) {
    const { liked, bookmarked, id, title, body, user, topics, media = [], replies_count } = testimony ?? {}
    const excerpt = body
    const isCompact = cardType === "compact"
    const author = user?.username
    const avatarUrl = user?.avatar_url
    const isCard = cardType === "card"
    const category = topics?.[0]?.name
    const [action, setAction] = useState<ActionType | null>(null)
    const { mutateAsync: handleAddBookmark, isPending: isBookmarking } = useBookmarkTestimony()
    const { mutateAsync: handleRemoveBookmark, isPending: isRemovingBookmark } = useRemoveBookmarkTestimony()
    const { mutateAsync: handleLikeTestimony, isPending: isLiking } = useLikeTestimony()
    const { mutateAsync: handleDislikeTestimony, isPending: isDisliking } = useDisLikeTestimony()
    const { authenticateUser } = useAuthenticateUser()

    const bookmarkItem = async () => {
        if (bookmarked) {
            await handleRemoveBookmark(id.toString())
        } else {
            await handleAddBookmark(id.toString())
        }
    }

    const hideItem = async () => {

    }

    const reportItem = async () => {

    }

    const handleAction = (e: Event, value: ActionType) => {
        e?.stopPropagation()
        e?.preventDefault()
        if (!authenticateUser("continue this action")) return
        switch (value) {
            case "save":
                bookmarkItem();
                break
            case "hide":
                hideItem();
                break
            case "report":
                reportItem();
                break
            default:
                break;

        }
        setAction(value)
    }

    /*
     --------------------------------------------------
     Media helpers
     --------------------------------------------------
    */
    const { firstImage } = useMemo(() => {
        if (!media) return {}
        const images = media?.filter((m) => m.type === "image")
        const videos = media?.filter((m) => m.type === "video")

        return {
            images,
            videos,
            firstImage: images?.[0]?.url,
            hasMedia: images?.length > 0 || videos.length > 0
        }
    }, [media])

    const readTime = estimateReadTime(excerpt)

    const handleCelebrate = async () => {
        if (liked) {
            await handleDislikeTestimony(id.toString())
        } else {
            await handleLikeTestimony(id.toString())
        }
    }

    const handleShare = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.stopPropagation()
        e?.preventDefault()

        try {
            const shareData = {
                url: `${window.location.origin}/t/${id}`
            }

            if (navigator.share) {
                await navigator.share(shareData)
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(shareData.url)
                alert("Link copied to clipboard")
            }
        } catch (error) {
            console.error("Share failed:", error)
        }
    }
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
                        showCheck={false}
                        align="end"
                        onChange={handleAction}
                        items={[
                            { value: "save", icon: <Bookmark className={bookmarked ? "text-orange-500 fill-orange-500" : ""} />, label: <span className={bookmarked ? "text-orange-500" : ""}>{bookmarked ? "Remove" : "Save"}</span>, isLoading: isBookmarking || isRemovingBookmark },
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

                </div>
                    {/* ------------------ Actions ------------------ */}
                <div className="mt-4 flex flex-wrap items-center gap-2 relative z-30">
                        <ActionButton
                        label={liked ? "Celebrated" : "Celebrate"}
                        icon={isLiking || isDisliking ? <Loader2 className="animate-spin size-4" /> : <CelebrateIcon />}
                        onClick={handleCelebrate}
                        className={cn("", liked && "text-orange-500 border-orange-500")}
                        />
                    <ActionButton icon={<ChatCircle />
                    }
                        label={replies_count.toString()}
                        className="cursor-copy"
                    />
                    {/* <ActionButton icon={<KeyIcon />} className="px-1 py-1 size-7!"
                        onClick={ } /> */}
                    <ActionButton label="Share" icon={<Share06 className="size-4" />}
                        onClick={handleShare} />
                </div>
            </section>
        </article>
    )
}

function ActionButton({
    label,
    icon,
    className,
    onClick

}: {
    readonly label?: string
    readonly icon?: React.ReactNode
    readonly className?: string
        readonly onClick?: () => void
}) {
    const { authenticateUser } = useAuthenticateUser()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        e.preventDefault()
        if (!authenticateUser("continue this action")) return
        onClick?.()
    }

    return (
        <button
            onClick={handleClick}
            className={cn(
                "flex items-center justify-center cursor-pointer gap-1 rounded-full border px-4 py-1 text-sm text-neutral-700 hover:bg-neutral-50 disabled:opacity-50",
                className
            )}
        >
            {icon}
            {label}
        </button>
    )
}

