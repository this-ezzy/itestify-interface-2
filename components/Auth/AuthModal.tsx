'use client'
import React, { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/Redux/store'
import CustomDialog from '../shared/Modals/CustomDialog'
import { setActiveAuthMethod, toggleAuthModal } from '@/Redux/Slices/authSlice'
import { ActiveAuthModal } from '@/Redux/Interfaces/auth'
import LoginForm from '@/components/Auth/LoginForm'
import RegisterForm from '@/components/Auth/RegisterForm'
import ForgotPasswordForm from '@/components/Auth/ForgotPasswordForm'
import JoinCommunity from '@/components/Auth/JoinCommunity';
import CompleteProfile from '@/components/Auth/CompleteProfile';
import VerifyEmail from '@/components/Auth/VerifyEmail';
import { ArrowLeft } from '@untitled-ui/icons-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useGetParams, useUpdateParams } from '@/hooks';
import { Button } from '../ui/button';
import { useGoogleLogin } from '@/app/api/hooks/auth';



const LoginModal = () => {
    const { mutateAsync: handleGoogle, isPending } = useGoogleLogin()
    const { email } = useGetParams(["email"])
    const decodedEmail = decodeURIComponent(email)
    const { updateParams } = useUpdateParams()
    const { activeAuthMethod, showAuthModal } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const isLogin = activeAuthMethod === "login"
    const isRegister = activeAuthMethod === "register"
    const isForgotPassword = activeAuthMethod === "forgotPassword"
    const isVerifyEmail = activeAuthMethod === "verifyEmail"
    const isCompleteProfile = activeAuthMethod === "completeProfile"
    const isJoinCommunity = activeAuthMethod === "joinCommunity"
    const showGoogleLogin = isLogin || isRegister

    const handleClose = () => {
        // Close modal logic here
        dispatch(toggleAuthModal())
        updateParams({ email: null })
        dispatch(setActiveAuthMethod("login"))
    }

    const modalData = useMemo(() => {
        switch (activeAuthMethod) {
            case "login":
                return {
                    title: "Welcome Back!",
                    description: "Share your testimony. Encourage someone’s faith today."
                }
            case "register":
                return {
                    title: "Create your account",
                    description: "Join a community sharing real stories of God’s goodness."
                }
            case "forgotPassword":
                return {
                    title: "Reset your password",
                    description: "Enter your email to receive password reset instructions."
                }
            case "verifyEmail":
                return {
                    title: "Verify your email",
                    description: `We have sent a 6-digit verification code to ${decodedEmail}`
                }
            case "completeProfile":
                return {
                    title: "Create your profile",
                    description: "First things first, tell us a bit about yourself!"
                }
            case "joinCommunity":
                return {
                    title: "You’re in!",
                    description: "You’re all set! Before you dive in, discover fellowships that share your faith stories."
                }
            default:
                return {
                    title: "",
                    description: ""
                }
        }
    }, [activeAuthMethod, decodedEmail])

    const handleSetAuthMethod = useCallback((method: ActiveAuthModal) => {
        dispatch(setActiveAuthMethod(method))
    }, [dispatch])

    const customHeader = useMemo(() => {
        if (isVerifyEmail || isCompleteProfile) {
            return <CustomHeader page={activeAuthMethod} handleSetAuthMethod={handleSetAuthMethod} />
        }
        if (isJoinCommunity) {
            return (
                <div className='flex justify-center w-full'>
                    <CommunityIcon />
                </div>
            )
        }
        return null
    }, [isVerifyEmail, isCompleteProfile, isJoinCommunity, activeAuthMethod, handleSetAuthMethod])

    const googleLogin = async () => {
        await handleGoogle()

    }
    return (
        <CustomDialog
            isOpen={showAuthModal}
            onClose={handleClose}
            title={modalData.title}
            description={modalData.description}
            titleClassName=''
            contentClassName={cn('md:max-w-[622px] rounded-[30px] gap-0 p-8', isJoinCommunity && "bg-[linear-gradient(180deg,var(--gradient-1-start)_0%,var(--gradient-1-start)_44%),url('/assets/Mosaic.png')] bg-repeat bg-contain bg-center md:max-w-[803px]!")}
            headerClassName='flex flex-col items-center text-center mb-4 max-w-[400px] mx-auto gap-2'
            showCloseButton={!isVerifyEmail && !isCompleteProfile}
            customHeader={customHeader}
            disableOutsideClick={true}
        >


            {
                showGoogleLogin &&
                <div>
                    {/* Login form or content goes here */}
                        <Button onClick={googleLogin} className='w-full h-12 font-semibold text-neutral-900 text-base rounded-[12px]' loading={isPending} variant="outline">
                            <Image src="/assets/devicon_google.svg" alt='Google icon' height={20} width={20} />
                            Continue with Google</Button>
                    <div className='flex items-center gap-3 my-4'>
                        <div className='h-px border-neutral-300 border border-dashed  flex-1'></div>
                        <span className='text-sm text-neutral-500'>or continue with email</span>
                        <div className='h-px border-neutral-300 border border-dashed  flex-1'></div>
                    </div>
                </div>
            }

            {isLogin && <LoginForm handleSetAuthMethod={handleSetAuthMethod} />}
            {isRegister && <RegisterForm handleSetAuthMethod={handleSetAuthMethod} />}
            {isForgotPassword && <ForgotPasswordForm />}
            {isVerifyEmail && <VerifyEmail />}
            {isCompleteProfile && <CompleteProfile />}
            {isJoinCommunity && <JoinCommunity />}
        </CustomDialog>
    )
}

export default LoginModal


interface CustomHeaderProps {
    page: ActiveAuthModal
    handleSetAuthMethod?: (value: ActiveAuthModal) => void
}

const CustomHeader = ({ page, handleSetAuthMethod }: CustomHeaderProps) => {
    const currentStep = page === "verifyEmail" ? 1 : 2
    const stepText = currentStep === 1 ? "Step 1/2 — almost there!" : "Step 2/2 — last one!"
    return (
        <div className={cn('flex justify-between w-full items-center', currentStep === 2 && "justify-center")}>
            {
                currentStep === 1 &&
                <button onClick={() => handleSetAuthMethod?.("register")} className='text-base font-medium flex items-center gap-2 cursor-pointer'>
                    <ArrowLeft /> Back
                    </button>
            }
            <p className='text-sm text-success-60 font-medium'>
                🎉  {stepText}
            </p>
        </div>
    )
}

const CommunityIcon = () => {
    return (
        <Image
            src="/assets/join-community-confetti.svg"
            alt="Community Icon"
            width={184}
            height={160.5}
        />
    )
}