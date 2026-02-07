// FooterActions.tsx
import ShareIcon from "@/components/shared/Icons/mail-send-email--send-email-paper-airplane.svg"
import ClockIcon from "@/components/shared/Icons/time_clock.svg"

export default function FooterActions({
    onPost,
    onSchedule,
    disabled
}: Readonly<{
    onPost: () => void
    onSchedule?: () => void
    disabled?: boolean
}>) {
    return (
        <div className="flex flex-col justify-between items-end h-full flex-1">
            <p className="text-neutral-400 font-medium">
                82/500
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

            <button
                disabled={disabled}
                onClick={onPost}
                    className="bg-black text-white px-4 py-1 rounded-full disabled:opacity-50 flex justify-center h-9 font-semibold text-sm items-center gap-2"
            >
                    <ShareIcon />

                Post
            </button>
        </div>
        </div>
    )
}
