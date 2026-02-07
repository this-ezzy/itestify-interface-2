'use client'
import { Button } from '@/components/ui/button'
import { Lock01, Mail01 } from '@untitled-ui/icons-react'
import { ActiveAuthModal } from '@/Redux/Interfaces/auth'
import { InputField } from '../shared'
import { LoginFormValues, loginSchema } from '@/utils/Schemas/login.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


interface FormProps {
    handleSetAuthMethod: (method: ActiveAuthModal) => void
}

const LoginForm = ({ handleSetAuthMethod }: FormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
    })

    const onSubmit = async (data: LoginFormValues) => {
        // Call your API here
        console.log(data)
    }

    return (
        <div>
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)} className='grid gap-y-4.5 w-full'>
                    <InputField
                        preIcon={<Mail01 />}
                        label="Your email"
                        placeholder='yourname@example.com'
                        className='bg-neutral-100 h-12 w-full rounded-2xl'
                        groupClassName='max-w-full '
                        required
                        {...register("email")}
                        error={errors.email?.message}

                    />
                    <InputField
                        type='password'
                        preIcon={<Lock01 />}
                        label={
                                <span>Your password</span>
                        }
                        rightLabel={

                                <Button variant="link" className='text-xs underline underline-offset-1'>Forgot password?</Button>

                        }
                        placeholder='Enter your password'
                        className='bg-neutral-100 h-12 w-full rounded-2xl'
                        groupClassName='max-w-full '
                        required
                        {...register("password")}
                        error={errors.password?.message}

                    />
                    <Button
                        type='submit'
                        disabled={isSubmitting || !isValid}
                        loading={isSubmitting}
                        className='w-full mt-2.5 h-12 font-bold text-base rounded-2xl!'
                    >

                        {
                            isSubmitting ? 'Signing you in...' : 'Sign in'
                        }
                    </Button>
                </form>
            </div>

            <div>
                <p className='text-center font-medium text-base text-neutral-500 mt-6'>
                    New to iTestify?
                    <Button
                        onClick={() => handleSetAuthMethod("register")}
                        variant="link"
                        className='  p-0! ml-1 text-neutral-900 font-medium cursor-pointer '>
                        Create an account
                    </Button>
                </p>
            </div>

        </div>
    )
}

export default LoginForm