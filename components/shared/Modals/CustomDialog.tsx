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
}


const CustomDialog = ({ isOpen, onClose, title, description, children, contentClassName, titleClassName, descriptionClassName, headerClassName, showCloseButton, customHeader }: Props) => {

    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent className={cn('p-12 max-h-[85vh]', contentClassName)} showCloseButton={showCloseButton}>
                <div>
                    {customHeader}
                </div>


                <DialogHeader className={cn('gap-0', headerClassName)}  >
                    <DialogTitle className={cn('text-[30px] font-bold', titleClassName)}>{title}</DialogTitle>
                    <DialogDescription className={cn('text-base text-center font-normal text-neutral-600', descriptionClassName)}>
                        {description}
                    </DialogDescription>
                </DialogHeader>

                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog