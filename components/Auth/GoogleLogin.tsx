'use client'
import { useGoogleCallback } from '@/app/api/hooks/auth'
import { useGetParams } from '@/hooks'
import { Loader2 } from 'lucide-react'
import React, { useCallback, useEffect } from 'react'

const GoogleLogin = () => {
    const { code } = useGetParams(["code"])
    const { mutateAsync: authorizeGoogle } = useGoogleCallback()

    const handleGoogleCallback = useCallback(async (code: string) => {
        await authorizeGoogle({ code })
    }, [authorizeGoogle])

    useEffect(() => {
        if (!code) return
        handleGoogleCallback(code)
    }, [code, handleGoogleCallback])

    return (
        <div className='fixed z-50 inset-0 w-full bg-white flex items-center justify-center'>
            <Loader2 className='text-neutral-200 size-8 animate-spin' />
        </div>
    )
}

export default GoogleLogin