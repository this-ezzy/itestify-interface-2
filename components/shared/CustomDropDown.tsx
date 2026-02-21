import React, { ReactNode } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Check } from "@untitled-ui/icons-react"
import { Loader2 } from "lucide-react"

export type DropdownItem<T extends string> = {
    value: T
    label: React.ReactNode   // for menu
    icon?: React.ReactNode  // for trigger or menu
    disabled?: boolean
    className?: string
    isLoading?: boolean
}



interface CustomDropdownProps<T extends string> {
    value: T | null
    onChange: (e: Event, value: T) => void
    items: DropdownItem<T>[]
    renderTrigger: (selected: DropdownItem<T> | null) => React.ReactNode
    align?: "start" | "center" | "end"
    side?: "top" | "right" | "bottom" | "left"
    contentClassName?: string
    showCheck?: boolean
}

export default function CustomDropDown<T extends string>({
    value,
    onChange,
    items,
    renderTrigger,
    align = "start",
    side = "bottom",
    contentClassName,
    showCheck
}: Readonly<CustomDropdownProps<T>>) {
    const selected = items.find((i) => i.value === value) ?? null

    return (
        <DropdownMenu>
            {/* ---- Trigger ---- */}
            <DropdownMenuTrigger asChild>
                <div
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                    }}
                >
                    {renderTrigger(selected)}
                </div>
            </DropdownMenuTrigger>

            {/* ---- Content ---- */}
            <DropdownMenuContent
                align={align}
                side={side}
                className={contentClassName}
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                {items.map((item) => {
                    const isActive = value === item.value
                    const isLoading = item.isLoading

                    return (
                        <DropdownMenuItem
                            key={item.value}
                            disabled={item.disabled}
                            onSelect={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                onChange(e as unknown as Event, item.value)
                            }}
                            className={cn(
                                "flex items-center justify-between gap-2",
                                item.className
                            )}
                        >
                            <span className="flex items-center gap-2">
                                {item.icon}
                                {item.label}
                            </span>

                            {isActive && !isLoading && showCheck && <Check />}
                            {isLoading && <Loader2 className="animate-spin" />}

                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}