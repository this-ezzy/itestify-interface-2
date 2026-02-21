// FooterActions.tsx
import ShareIcon from "@/components/shared/Icons/mail-send-email--send-email-paper-airplane.svg"
import ClockIcon from "@/components/shared/Icons/time_clock.svg"
import { LoadingSpinner } from "../shared"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

export default function FooterActions({
    onPost,
    onSchedule,
    disabled,
    isPosting,
    charCount,
    maxChar = 1500
}: Readonly<{
    onPost: () => void
    onSchedule?: () => void
    disabled?: boolean
    isPosting?: boolean
    charCount: number
    maxChar?: number
}>) {
    const exceedCharLimit = charCount > maxChar
    return (
        <div className="flex flex-col justify-between items-end h-full flex-1">
            <p className={cn("text-neutral-400 font-medium", exceedCharLimit && "text-red-500 underline underline-offset-2")}>
                {charCount}/{maxChar}
            </p>
            <div className="flex justify-between items-center gap-2">
                {onSchedule && (
                    <button
                        onClick={onSchedule}
                        className="text-sm text-neutral-600 font-medium flex justify-center items-center gap-2"
                    >
                        <ClockIcon />
                        Schedule for later
                    </button>
                )}

                <Button
                    variant="outline"
                    disabled={disabled || exceedCharLimit}
                    onClick={onPost}
                    className="bg-black disabled:cursor-not-allowed text-white px-4 py-1 rounded-full disabled:opacity-50 flex justify-center h-9 font-semibold text-sm items-center gap-2 hover:bg-black hover:text-white"
                >
                    {
                        isPosting ?
                            <LoadingSpinner size={12} />
                            :
                            <ShareIcon />
                    }
                    Post
                </Button>
            </div>
        </div>
    )
}
