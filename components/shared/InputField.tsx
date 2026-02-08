'use client'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"
import { ReactNode, forwardRef, useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface Props extends React.ComponentProps<"input"> {
    readonly preIcon?: ReactNode
    readonly sufIcon?: ReactNode
    readonly label?: ReactNode
    readonly groupClassName?: string
    readonly inputClassName?: string
    readonly error?: string
    readonly rightLabel?: ReactNode
}

const InputField = forwardRef<HTMLInputElement, Props>(
    (
        {
            sufIcon,
            preIcon,
            label,
            placeholder,
            className,
            groupClassName,
            inputClassName,
            required,
            error,
            rightLabel,
            type,
            ...props
        },
        ref
    ) => {
        const isPassword = type === "password"
        const [showPassword, setShowPassword] = useState(false)

        const resolvedType =
            isPassword && showPassword ? "text" : type ?? "text"

    return (
        <div className={cn("grid w-full max-w-sm gap-1", groupClassName)}>
            {label && (
                <label className="text-sm font-medium text-neutral-600 flex w-full items-center justify-between">
                    <span>
                        {label} {required && "*"}
                    </span>
                    {rightLabel}
                </label>
            )}

            <InputGroup
                className={cn(
                    className,
                    error && "border border-destructive"
                )}
            >
                {preIcon && (
                    <InputGroupAddon>
                        <InputGroupText>{preIcon}</InputGroupText>
                    </InputGroupAddon>
                )}

                <InputGroupInput
                    ref={ref}
                    type={resolvedType}
                    placeholder={placeholder}
                    className={inputClassName}
                    aria-invalid={!!error}
                    {...props}
                />

                {/* Password toggle OR custom suffix */}
                {(isPassword || sufIcon) && (
                    <InputGroupAddon align="inline-end">
                        <InputGroupText>
                            {isPassword ? (
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((p) => !p)}
                                    className="cursor-pointer"
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-4" />
                                    ) : (
                                        <Eye className="size-4" />
                                    )}
                                </button>
                            ) : (
                                sufIcon
                            )}
                        </InputGroupText>
                    </InputGroupAddon>
                )}
            </InputGroup>

            {error && (
                <p className="text-xs text-destructive">{error}</p>
            )}
        </div>
    )
    }
)

InputField.displayName = "InputField"

export default InputField
