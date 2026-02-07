import React, { ReactNode } from 'react'
import { Textarea } from '../ui/textarea'
import { cn } from '@/lib/utils'

interface Props extends React.ComponentProps<"textarea"> {
    readonly label?: React.ReactNode
    readonly groupClassName?: string
    readonly required?: boolean
    readonly error?: string
    readonly labelClassName?: string
    readonly actions?: ReactNode
}

const TextAreaField = ({ label, groupClassName, required, labelClassName, error, ...props }: Props) => {
    return (
        <div className={cn("grid w-full max-w-sm gap-1", groupClassName)}>
            {label && (
                <label className={cn("text-sm font-medium text-neutral-600", labelClassName)}>
                    {label} {required && "*"}
                </label>
            )}
            <Textarea {...props} />
            {error && (
                <p className="text-xs text-destructive">{error}</p>
            )}
        </div>
    )
}

export default TextAreaField