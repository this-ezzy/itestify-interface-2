import React, { ReactNode } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Check } from "@untitled-ui/icons-react"

export type DropdownItem<T extends string> = {
    value: T
    label: React.ReactNode   // for menu
    icon?: React.ReactNode  // for trigger or menu
    disabled?: boolean
    className?: string
}



interface CustomDropdownProps<T extends string> {
    value: T | null
    onChange: (value: T) => void
    items: DropdownItem<T>[]
    renderTrigger: (selected: DropdownItem<T> | null) => React.ReactNode
    align?: "start" | "center" | "end"
    side?: "top" | "right" | "bottom" | "left"
    contentClassName?: string
}


export default function CustomDropDown<T extends string>({
    value,
    onChange,
    items,
    renderTrigger,
    align = "start",
    side = "bottom",
    contentClassName,
}: Readonly<CustomDropdownProps<T>>) {
    const selected = items.find((i) => i.value === value) ?? null

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {renderTrigger(selected)}
            </DropdownMenuTrigger>

            <DropdownMenuContent align={align} side={side} className={contentClassName}>
                {items.map((item) => {
                    const isActive = value === item.value
                    return (
                        <DropdownMenuItem
                            key={item.value}
                            disabled={item.disabled}
                            onSelect={() => onChange(item.value)}
                            className={cn("flex items-center justify-between gap-2", item.className)}
                        >
                            <span className="flex items-center gap-2">

                                {item.icon}
                                {item.label}
                            </span>

                            {
                                isActive
                                &&
                                <Check />
                            }
                        </DropdownMenuItem>
                    )
                })}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
