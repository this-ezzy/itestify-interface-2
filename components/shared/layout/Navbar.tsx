'use client'
import React, { Activity, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { CustomDropDown, InputField, ITestifyLogo, LoadingSpinner } from '..'
import { Search } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/Redux/store'
import { toggleAuthModal } from '@/Redux/Slices/authSlice'
import { ChevronDown, Menu05, User03 } from '@untitled-ui/icons-react'
import { AlertIcon, CloseIcon, WriteCircle } from '../Icons'
import { toggleAppMenu, toggleShowAuthModal } from '@/Redux/Slices/appSlice'
import useAuth, { clientLogout } from '@/app/api/hooks/auth'
import { useGetProfile } from '@/app/api/hooks/user'
import { toggleTestimonyModal } from '@/Redux/Slices/testimonySlice'
import { toast } from 'sonner'
import { useGetParams, useUpdateParams } from '@/hooks'
import useAuthenticateUser from '@/hooks/useAuthenticateUser'

const Navbar = () => {
    const { updateParams } = useUpdateParams()
    const dispatch = useAppDispatch()
    const { data: auth, isLoading: isLoadingAuth } = useAuth()
    const { data: userProfile, isLoading } = useGetProfile()
    const { showNavTestimonyButton, isAppMenuOpen } = useAppSelector((state) => state.app)
    const [accountAction, setAccountAction] = useState<"profile" | "logout" | null>(null)
    const isAuth = !!auth?.token
    const [searchTerm, setSearchTerm] = useState("")
    const { q } = useGetParams(["q"])
    const { authenticateUser } = useAuthenticateUser()

    const handleLoginClick = () => {
        dispatch(toggleAuthModal())
    }

    const signOut = async () => {
        await clientLogout()
    }

    const toggleMenu = () => {
        dispatch(toggleAppMenu())
    }

    const handleCreateTestimony = () => {
        if (!authenticateUser()) return
        dispatch(toggleTestimonyModal())
    }


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    useEffect(() => {
        const trimmed = searchTerm.trim()

        const timeout = setTimeout(() => {
            if (trimmed) {
                // Only clear topic if actively searching
                updateParams({
                    q: trimmed,
                    topic: null,
                })
            } else {
                // If search cleared, just remove q
                updateParams({
                    q: null,
                })
            }
        }, 500)

        return () => clearTimeout(timeout)
    }, [searchTerm])

    useEffect(() => {
        if (!q) {
            const id = setTimeout(() => {
                setSearchTerm("")
            }, 0)
            return () => clearTimeout(id)
        }
    }, [q])

    return (
        <div className='border-b  w-full min-h-18 px-4 md:px-8 flex justify-between items-center gap-4'>
            <div className='flex-1'>

                <ITestifyLogo />
            </div>
            <div className='flex-1 hidden md:flex justify-center'>

                <InputField value={searchTerm} onChange={handleSearch} placeholder="Search for anything..." className='bg-neutral-100 h-10' preIcon={<Search />} />
            </div>

            {
                isLoading || isLoadingAuth ?
                    <LoadingSpinner size={14} />
                    :
                    <section className='flex items-center justify-end gap-2 md:flex-1'>
                        {
                            isAuth ?

                                <div className='flex items-center gap-2 flex-1  ml-auto w-full justify-end'>
                                    <Activity mode={showNavTestimonyButton ? "visible" : "hidden"}  >
                                        <Button onClick={handleCreateTestimony} className='rounded-[14px] hidden md:flex starting:opacity-0 opacity-100 duration-200 ease-linear'>
                                            <WriteCircle />
                                            Share your testimony
                                        </Button>
                                    </Activity>

                                    <button className='rounded-full border size-10 shrink-0 flex items-center justify-center'>
                                        <AlertIcon />
                                    </button>
                                    <div className='flex items-center gap-1'>
                                    <User03 />
                                        <p className='hidden md:flex'>{userProfile?.username ?? userProfile?.email}</p>
                                    <CustomDropDown
                                        value={accountAction}
                                        align='end'
                                        onChange={(e, value) => {
                                            setAccountAction(value)

                                            if (value === "profile") {
                                                console.log("Profile")
                                            }

                                            if (value === "logout") {
                                                signOut()
                                            }
                                        }}
                                        items={[
                                            { value: "profile", label: "Profile" },
                                            { value: "logout", label: <span className="text-red-500">Logout</span> },
                                        ]}
                                        renderTrigger={() => (

                                                <ChevronDown />

                                        )}
                                        contentClassName="min-w-[120px]"
                                    />
                                    </div>
                                </div>

                                :

                                <div className='flex items-center gap-2'>
                                    <Button onClick={handleLoginClick} className='bg-neutral-100 hover:bg-neutral-100 cursor-pointer text-neutral-800 text-sm font-medium rounded-md h-10'>Log in</Button>
                                </div>
                        }
                        <Button onClick={toggleMenu} className='bg-neutral-100 md:hidden hover:bg-neutral-100 cursor-pointer text-neutral-800 text-base font-medium rounded-md size-10'>
                            {
                                isAppMenuOpen ?
                                    <CloseIcon />
                                    : <Menu05 />
                            }
                        </Button>
                    </section>
            }
        </div>
    )
}

export default Navbar