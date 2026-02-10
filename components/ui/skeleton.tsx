import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-neutral-200 animate-pulse rounded-md h-4 w-28", className)}
      {...props}
    />
  )
}

export { Skeleton }
