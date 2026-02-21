'use client'
import { Button } from '@/components/ui/button'
import { SidebarToggleIcon } from '../Icons'
import { AppLinks, AppRoutes, FooterLinks } from '@/utils/constants/routes'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, HeartHand, InfoCircle } from '@untitled-ui/icons-react'
import Image from 'next/image'
import ColorModeToggle from './ColorModeToggle'
import { useAppDispatch, useAppSelector } from '@/Redux/store'
import { toggleAppMenu, toggleShowAboutModal } from '@/Redux/Slices/appSlice'
import { useGetFellowships } from '@/app/api/hooks/fellowships'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetAllTopics } from '@/app/api/hooks/topics'
import { useGetParams, useUpdateParams } from '@/hooks'
import { trendingFellowships } from '@/views/Home'



const Sidebar = () => {
    const pathname = usePathname()
    // const { data: fellowshipData, isLoading } = useGetFellowships()
    const { data: topicsData, isLoading } = useGetAllTopics()
    const activeFellowshipSlug = pathname.split("/")[2]
    const { isAppMenuOpen } = useAppSelector((state) => state.app)
    const dispatch = useAppDispatch()
    const { updateParams } = useUpdateParams()
    const { topic } = useGetParams(["topic"])

    const showAboutModal = () => {
        dispatch(toggleShowAboutModal(true))
    }

    const closeMenu = () => {
        dispatch(toggleAppMenu())
    }


    const handleTopicClick = (id: string) => {
        updateParams({ topic: id })
    }

    return (
        <>
            {/* ===== Mobile Backdrop ===== */}
            {isAppMenuOpen && (
                <div
                    onClick={closeMenu}
                    className="
          absolute inset-0 z-30
          bg-black/40 backdrop-blur-sm
          md:hidden
        "
                />
            )}
            <div
                className={cn(
                    " z-40 absolute md:relative top-0 h-full border-r bg-neutral-25 py-7 flex flex-col justify-between overflow-hidden md:overflow-visible",

                    // animate width instead of translate
                    "transition-all duration-300 ease-in-out",

                    // state
                    isAppMenuOpen ? "w-78 " : "w-0 md:relative",

                    // desktop always visible
                    "md:w-78"
                )}
            >



                <Button
                    className="rounded-full hidden md:flex size-8 p-2  items-center justify-center absolute -right-4 top-7 bg-neutral-25 dark:bg-neutral-25 z-50"
                    variant="outline"
                >
                    <SidebarToggleIcon />
                </Button>

                <section>

                    <ul className='px-5 space-y-2'>
                        {
                            AppLinks.map((item) => {
                                const isActive = pathname === item.href && !topic
                                const Icon = item.icon
                                return (
                                    <Link href={item.href} key={item.id} className={cn('flex font-medium items-center gap-2.5 px-3 py-2 hover:bg-neutral-100 rounded-lg text-neutral-600 text-sm', isActive && "bg-neutral-100 text-neutral-800")}>
                                        <Icon className={cn(isActive && 'text-orange-500')} />
                                        <span >{item.label}</span>
                                    </Link>
                                )
                            })
                        }
                    </ul>

                    <section className='border-y py-4 px-5 mt-4'>
                        <h4 className='p-2 flex items-center gap-2 uppercase text-xs font-medium text-neutral-600'>Topics <ChevronRight className='size-5' /> </h4>

                        {
                            isLoading ?
                                <ul className='space-y-4'>
                                    {
                                        [1, 2, 3, 4, 5].map((item) => (
                                            <Skeleton key={item} className='w-full h-6' />
                                        ))
                                    }
                                </ul>
                                :
                                <>
                                    {
                                        topicsData?.length ?
                                            <ul className='space-y-1'>
                                                {
                                                    topicsData?.map((fellowship) => {
                                                        const isActive = topic === fellowship?.id.toString()
                                                        const Icon = trendingFellowships.find((item) => item.title.toLowerCase() === fellowship.name.toLowerCase())
                                                        return (
                                                            <button onClick={() => handleTopicClick(fellowship.id.toString())} key={fellowship.id} className={cn('flex px-3 py-2 items-center gap-3.5 rounded-lg text-neutral-600 text-sm', isActive && "bg-neutral-100 text-neutral-800 w-full ")}>
                                                                {Icon &&
                                                                    <Icon.icon style={{ color: Icon.color }} />
                                                                }
                                                                <p className='text-neutral-800 font-medium text-sm truncate'>{fellowship.name}</p>
                                                            </button>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            :
                                            < NoFellowship />
                                    }
                                </>
                        }
                    </section>

                    <section className='px-4 py-4'>
                        <button onClick={showAboutModal} className={cn('flex font-medium w-full items-center gap-2.5 px-3 py-2 hover:bg-neutral-100 rounded-lg text-neutral-600 text-sm',)} >
                            <InfoCircle />
                            <span>About iTestify</span>
                        </button>
                        <Link href={AppRoutes.Donation.href} className={cn('flex font-medium items-center gap-2.5 px-3 py-2 hover:bg-neutral-100 rounded-lg text-neutral-600 text-sm',)}>
                            <HeartHand />
                            <span>Make a donation</span>
                        </Link>
                    </section>
                </section>

                <section className='px-5 space-y-4'>
                    <ColorModeToggle />
                    <ul className="flex items-center text-neutral-500">
                        {FooterLinks.map((item) => (
                            <Link href={item.href}
                                key={item.id}
                                className="after:mx-3 after:content-['•'] text-sm font-medium last:after:content-['']"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </ul>

                </section>
            </div>
        </>
    )
}

export default Sidebar


const NoFellowship = () => {
    return (
        <div className='text-sm'>
            No Available Fellowship yet
        </div>
    )
}