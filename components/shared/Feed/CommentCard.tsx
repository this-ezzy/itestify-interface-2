// components/PostCard.tsx
import Image from "next/image"
import { cn } from "@/lib/utils"
import { CelebrateIcon, ChatCircle, ShareIcon } from "../Icons"
import { Testimony } from "@/app/api/hooks/testimony/types"
import { estimateReadTime } from "@/utils/readTime"


type CommentCardProps = {
    readonly className?: string
    readonly comment: Testimony
}

export default function CommentCard({
    className,
    comment
}: CommentCardProps) {
    const { liked, bookmarked, id, title, body, user, topics, media = [] } = comment ?? {}
    const excerpt = body
    const author = user?.username
    const avatarUrl = user?.avatar_url
    const readTime = estimateReadTime(excerpt)
    return (
        <article className={cn("w-full max-w-full flex items-stretch gap-2   ", className)}>
            {/* Header */}
            <div className="flex flex-col items-center shrink-0">
                <Image
                    src={avatarUrl ?? "/assets/Avatars Default with Backdrop.svg"}
                    alt={author}
                    width={32}
                    height={32}
                    className="rounded-full shrink-0 size-8!"
                />

                <div className="flex-1 w-px bg-neutral-300 mt-1" />
            </div>


            <section className="w-full">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">

                        <div className="text-sm flex gap-2 items-center">
                            <span className="font-medium text-neutral-900">
                                {author}
                            </span>
                            <div className="text-neutral-400">{readTime}min</div>
                        </div>
                    </div>

                    <button className="text-neutral-400 hover:text-neutral-600 rotate-90 ml-auto">•••</button>
                </div>

                {/* Excerpt */}
                <p className="mt-3 text-sm text-neutral-600 ">{excerpt}</p>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2">
                    <ActionButton label="Celebrate" icon={<CelebrateIcon className="text-neutral-700" />} className="px-3" />
                    {/* <ActionButton icon={<ChatCircle className="text-neutral-700" />} className="size-7!" />
                    <ActionButton icon={<ShareIcon className="text-neutral-700" />} className="size-7!" /> */}
                </div>
            </section>
        </article>
    )
}

function ActionButton({ label, icon, className }: { readonly label?: string; readonly icon?: React.ReactNode; readonly className?: string }) {
    return (
        <button className={cn(`flex items-center justify-center cursor-pointer gap-1 py-1 rounded-full border border-neutral-200  text-sm text-neutral-700 h-7! hover:bg-neutral-50`, className)}>
            {icon}
            {label}
        </button>
    )
}


