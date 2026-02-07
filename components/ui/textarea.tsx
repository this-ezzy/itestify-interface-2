import * as React from "react"
import { cn } from "@/lib/utils"

interface TextareaProps extends React.ComponentProps<"textarea"> {
  actions?: React.ReactNode
}

function Textarea({ className, actions, ...props }: Readonly<TextareaProps>) {
  return (
    <div className="relative w-full">
      <textarea
        data-slot="textarea"
        className={cn(
          `
          border-input
          placeholder:text-muted-foreground
          focus-visible:border-none
          focus-visible:ring-neutral-900
          aria-invalid:ring-destructive/20
          dark:aria-invalid:ring-destructive/40
          aria-invalid:border-destructive
          dark:bg-input/30
          field-sizing-content
          min-h-16
          w-full
          rounded-md
          border
          bg-transparent
          px-3
          py-2
          text-base
          shadow-xs
          transition-[color,box-shadow]
          outline-none
          focus-visible:ring-[1px]
          disabled:cursor-not-allowed
          disabled:opacity-50
          md:text-sm
          resize-none
          `,
          className
        )}
        {...props}
      />

      {actions && (
        <div className="absolute bottom-4 right-3 flex gap-2">
          {actions}
        </div>
      )}
    </div>
  )
}

export { Textarea }
