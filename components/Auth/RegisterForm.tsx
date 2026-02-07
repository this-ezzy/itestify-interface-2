'use client'

import { ActiveAuthModal } from "@/Redux/Interfaces/auth"

import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterFormValues, registerSchema } from "@/utils/Schemas/register.schema"
import { useAppDispatch } from "@/Redux/store"
import { setActiveAuthMethod } from "@/Redux/Slices/authSlice"
import { InputField } from "../shared"


interface FormProps {
    handleSetAuthMethod: (method: ActiveAuthModal) => void
}

const RegisterForm = ({ handleSetAuthMethod }: FormProps) => {
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onSubmit",
    })

    const onSubmit = async (data: RegisterFormValues) => {
        // Call your API here
        console.log(data)
        dispatch(setActiveAuthMethod("verifyEmail"))
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-y-4.5 w-full"
            >
                <InputField
                    label="Your email"
                    placeholder="yourname@example.com"
                    className="bg-neutral-100 h-12 w-full rounded-2xl"
                    groupClassName="max-w-full"
                    required
                    error={errors.email?.message}
                    {...register("email")}
                />

                <InputField
                    type="password"
                    label="Your password"
                    placeholder="Enter your password"
                    className="bg-neutral-100 h-12 w-full rounded-2xl"
                    groupClassName="max-w-full"
                    required
                    error={errors.password?.message}
                    {...register("password")}
                />

                <Button
                    type="submit"
                    loading={isSubmitting}
                    className="w-full mt-2.5 h-12 font-bold text-base rounded-2xl"
                >
                    {
                        isSubmitting ? 'Creating your account...' : 'Create Account'
                    }

                </Button>
            </form>

            <div className="mt-7 space-y-8">
                <p className="text-center text-xs">
                    By clicking &quot;Create Account&quot; you agree to our
                    <br />
                    Terms & Conditions and Privacy Policy.
                </p>

                <p className="text-center font-medium text-base text-neutral-500">
                    Already have an account?
                    <Button
                        disabled={isSubmitting || !isValid}
                        loading={isSubmitting}
                        onClick={() => handleSetAuthMethod("login")}
                        variant="link"
                        className="p-0 ml-1 text-neutral-900 font-medium"
                    >
                        Log in
                    </Button>
                </p>
            </div>
        </div>
    )
}

export default RegisterForm
