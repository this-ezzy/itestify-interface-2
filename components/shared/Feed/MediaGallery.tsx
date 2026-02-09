'use client'

import Image from "next/image"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

export interface MediaItem {
    path: string
    type: "image" | "video" | string
    url: string
}

type Variant = "card" | "compact"

interface Props {
    media?: MediaItem[]
    variant?: Variant
    className?: string
    imageClassName?: string
}

/*
  Responsibilities:
  - compact → single thumbnail
  - card → responsive grid
  - supports images + videos
*/
export default function MediaGallery({
    media = [],
    variant = "card",
    className,
    imageClassName
}: Props) {
    const { images, videos, firstImage, hasMedia } = useMemo(() => {
        const images = media.filter((m) => m.type === "image")
        const videos = media.filter((m) => m.type === "video")

        return {
            images,
            videos,
            firstImage: images[0]?.url,
            hasMedia: images.length > 0 || videos.length > 0
        }
    }, [media])

    if (!hasMedia) return null

    /*
    ---------------------------
    Compact → thumbnail only
    ---------------------------
    */
    if (variant === "compact" && firstImage) {
        return (
            <div className="mr-2 h-14 w-18 shrink-0 overflow-hidden rounded-lg">
                <Image
                    src={firstImage}
                    alt="media"
                    width={72}
                    height={56}
                    className="h-full w-full object-cover rounded-lg"
                    priority
                />
            </div>
        )
    }

    /*
    ---------------------------
    Card → grid layout
    ---------------------------
    */
    return (
        <div className={cn("mt-3 space-y-3", className)}>
            {/* Images grid */}
            {images.length > 0 && (
                <div
                    className={cn(
                        "grid gap-2 overflow-hidden rounded-lg",
                        images.length === 1 && "grid-cols-1",
                        images.length === 2 && "grid-cols-2",
                        images.length >= 3 && "grid-cols-2"
                    )}
                >
                    {images.slice(0, 4).map((img, i) => (
                        <Image
                            key={i}
                            src={img.url}
                            alt={`media-${i}`}
                            width={600}
                            height={400}
                            className={cn(
                                "w-full object-cover rounded-lg",
                                images.length === 1 ? "max-h-[420px]" : "h-40",
                                imageClassName
                            )}
                        />
                    ))}
                </div>
            )}

            {/* Videos */}
            {videos.map((video, i) => (
                <video
                    key={i}
                    src={video.url}
                    controls
                    className="w-full rounded-lg max-h-[420px] object-cover"
                />
            ))}
        </div>
    )
}
