'use client'
import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils'

interface Props {
    isOpen: boolean
    onClose: () => void
    title?: ReactNode
    description?: ReactNode
    children: React.ReactNode
    contentClassName?: string
    titleClassName?: string
    descriptionClassName?: string
    headerClassName?: string
    showCloseButton?: boolean
    customHeader?: ReactNode
    disableClose?: boolean
    disableOutsideClick?: boolean
}

const CustomDialog = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    contentClassName,
    titleClassName,
    descriptionClassName,
    headerClassName,
    showCloseButton,
    customHeader,
    disableClose = false,
    disableOutsideClick = false,
}: Props) => {

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                // Block closing via escape key or X button if disableClose is true
                if (disableClose) return
                if (!open) onClose()
            }}
        >
            <DialogContent
                className={cn('p-12 max-h-[85vh] overflow-y-auto', contentClassName)}
                showCloseButton={showCloseButton && !disableClose}

                // Block backdrop click if disableClose or disableOutsideClick
                onPointerDownOutside={(e) => {
                    if (disableClose || disableOutsideClick) e.preventDefault()
                }}
                onInteractOutside={(e) => {
                    if (disableClose || disableOutsideClick) e.preventDefault()
                }}
            >
                {customHeader}

                <DialogHeader className={cn('gap-0', headerClassName)}>
                    <DialogTitle className={cn('text-[30px] font-bold', titleClassName)}>
                        {title}
                    </DialogTitle>

                    <DialogDescription
                        className={cn(
                            'text-base text-center font-normal text-neutral-600',
                            descriptionClassName
                        )}
                    >
                        {description}
                    </DialogDescription>
                </DialogHeader>

                <div>{children}</div>
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog
