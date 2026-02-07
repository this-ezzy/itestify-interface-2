'use client'
import React, { ReactNode } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { cn } from '@/lib/utils'
import { useWindowSize } from '@/hooks/use-window-size'



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
    const { width } = useWindowSize()


    const isDesktop = typeof width === 'number' && width > 768
    const side: 'center' | 'bottom' = isDesktop ? 'center' : 'bottom'

    return (
        <Sheet open={isOpen} onOpenChange={onClose} >
            <SheetContent dir={side} className={cn('p-12 max-h-[85vh]', contentClassName)}>
                <div>
                    {customHeader}
                </div>


                <SheetHeader className={cn('gap-0', headerClassName)}  >
                    <SheetTitle className={cn('text-[30px] font-bold', titleClassName)}>{title}</SheetTitle>
                    <SheetDescription className={cn('text-base text-center font-normal text-neutral-600', descriptionClassName)}>
                        {description}
                    </SheetDescription>
                </SheetHeader>

                <div>
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CustomDialog