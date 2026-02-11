'use client'

import React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputField, TextAreaField } from '../shared'
import { Button } from '../ui/button'
import { User01 } from '@untitled-ui/icons-react'

import { useAppDispatch } from '@/Redux/store'
import { setActiveAuthMethod } from '@/Redux/Slices/authSlice'
import { useUpdateProfile } from '@/app/api/hooks/user'
import {
    CompleteProfileFormValues,
    completeProfileSchema,
} from '@/utils/Schemas/register.schema'

const CompleteProfile = () => {
    const dispatch = useAppDispatch()
    const { mutateAsync: handleUpdateProfile } = useUpdateProfile()

    const {
        register,
        handleSubmit,
        control, // ✅ needed for useWatch
        formState: { errors, isSubmitting, isValid },
    } = useForm<CompleteProfileFormValues>({
        resolver: zodResolver(completeProfileSchema),
        mode: 'onSubmit',
    })

    /* ✅ subscribe ONLY to bio field */
    const bio = useWatch({
        control,
        name: 'bio',
    })

    const textFieldCharCount = bio?.length ?? 0

    const onSubmit = async (data: CompleteProfileFormValues) => {
        await handleUpdateProfile(
            {
                first_name: data.firstName,
                last_name: data.lastName,
                bio: data.bio,
                username: data.userName,
            },
            {
            onSuccess: () => {
                    dispatch(setActiveAuthMethod('joinCommunity'))
                },
            }
        )
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-y-4.5 w-full"
            >
                <div className="grid grid-cols-2 gap-x-4.5">
                    <InputField
                        preIcon={<User01 />}
                        label="First name"
                        placeholder="John"
                        className="bg-neutral-100 h-12 w-full rounded-[14px]"
                        groupClassName="max-w-full"
                        required
                        {...register('firstName')}
                        error={errors.firstName?.message}
                    />

                    <InputField
                        preIcon={<User01 />}
                        label="Last name"
                        placeholder="The Baptist"
                        className="bg-neutral-100 h-12 w-full rounded-[14px]"
                        groupClassName="max-w-full"
                        required
                        {...register('lastName')}
                        error={errors.lastName?.message}
                    />
                </div>

                <InputField
                    preIcon={<>@</>}
                    label="Username"
                    placeholder="Your unique name on iTestify"
                    className="bg-neutral-100 h-12 w-full rounded-[14px]"
                    groupClassName="max-w-full"
                    required
                    {...register('userName')}
                    error={errors.userName?.message}
                />

                <TextAreaField
                    label={
                        <div className="flex items-center w-full justify-between gap-2">
                            <span>Brief bio</span>
                            <span>{textFieldCharCount}/120</span>
                        </div>
                    }
                    placeholder="Tell others who you are or what you believe"
                    className="bg-neutral-100 h-12 w-full rounded-[14px]"
                    groupClassName="max-w-full"
                    maxLength={120}
                    rows={10}
                    {...register('bio')}
                    error={errors.bio?.message}
                />

                <Button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    loading={isSubmitting}
                    className="w-full mt-2.5 h-12 font-bold text-base rounded-2xl!"
                >
                    {isSubmitting
                        ? 'Hold on, setting you up...'
                        : 'Complete Profile'}
                </Button>
            </form>
        </div>
    )
}

export default CompleteProfile
