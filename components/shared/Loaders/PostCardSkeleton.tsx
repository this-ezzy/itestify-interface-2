'use client'
import { cn } from "@/lib/utils"

type CardType = "compact" | "card"

interface Props {
  readonly cardType?: CardType
  readonly className?: string
}

export default function PostCardSkeleton({
  cardType = "card",
  className
}: Props) {
  const isCompact = cardType === "compact"
  const isCard = cardType === "card"

  return (
    <article
      className={cn(
        "w-full flex items-start gap-2 border-t animate-pulse",
        className
      )}
    >
      {/* compact thumbnail */}
      {isCompact && (
        <div className="h-14 w-18 shrink-0 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
      )}

      <section className="w-full min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />

            <div className="flex flex-col gap-1">
              <div className="h-3 w-28 rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-2 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="size-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            <div className="size-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            <div className="size-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          </div>
        </div>

        {/* Category */}
        <div className="mt-3 h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />

        {/* Title */}
        <div className="mt-3 h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />

        {/* Image */}
        {isCard && (
          <div className="mt-3 h-48 w-full rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        )}

        {/* Excerpt */}
        <div className="mt-3 space-y-2">
          <div className="h-3 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-3 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-3 w-4/6 rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <div className="h-7 w-20 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-7 w-10 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-7 w-10 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-7 w-16 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </section>
    </article>
  )
}
