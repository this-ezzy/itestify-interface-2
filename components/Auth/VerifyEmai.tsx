import React from 'react'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { VerifyFormValues, verifySchema } from '@/utils/Schemas/register.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/Redux/store'
import { setActiveAuthMethod } from '@/Redux/Slices/authSlice'
import { InputField } from '../shared'

const VerifyEmail = () => {
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<VerifyFormValues>({
        resolver: zodResolver(verifySchema),
        mode: "onSubmit",
    })

    const onSubmit = async (data: VerifyFormValues) => {
        // Call your API here
        console.log(data)
        dispatch(setActiveAuthMethod("completeProfile"))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='grid gap-y-4.5 w-full'>
                <InputField

                    label="Verification code"
                    placeholder='123 - 456'
                    className='bg-neutral-100 h-12 w-full rounded-2xl'
                    groupClassName='max-w-full '
                    required
                    {...register("code")}
                    error={errors.code?.message}

                />

                <Button
                    type='submit'
                    disabled={isSubmitting || !isValid}
                    loading={isSubmitting}
                    className='w-full mt-2.5 h-12 font-bold text-base rounded-2xl!'>
                    {
                        isSubmitting ? 'Verifying your email...' : 'Verify & Continue'
                    }
                </Button>
            </form>

            <p className='text-center text-sm text-neutral-600 mt-2'>
                Didn’t get an email?{" "}
                <Button variant='link' className='px-0 text-sm font-medium'>
                    Resend
                </Button>
            </p>

        </div>
    )
}

export default VerifyEmail


