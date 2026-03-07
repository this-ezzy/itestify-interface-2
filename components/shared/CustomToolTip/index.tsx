import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import React, { ReactNode } from 'react'

interface Props {
    content: ReactNode
    trigger: ReactNode
}

const Index = ({ content, trigger }: Props) => {
    return (
        <Tooltip>
            <TooltipTrigger>{trigger}</TooltipTrigger>
            <TooltipContent>
                {content}
            </TooltipContent>
        </Tooltip>
    )
}

export default Index