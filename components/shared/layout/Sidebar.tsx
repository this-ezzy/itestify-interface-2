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



const Sidebar = () => {
    const pathname = usePathname()
    const activeFellowshipSlug = pathname.split("/")[2]
    const { isAppMenuOpen } = useAppSelector((state) => state.app)
    const dispatch = useAppDispatch()

    const showAboutModal = () => {
        dispatch(toggleShowAboutModal(true))
    }

    const closeMenu = () => {
        dispatch(toggleAppMenu())
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
                        const isActive = pathname === item.href
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
                    <h4 className='p-2 flex items-center gap-2 uppercase text-xs font-medium text-neutral-600'>Fellowships <ChevronRight className='size-5' /> </h4>

                    <ul className='space-y-1'>
                        {
                            FELLOWSHIPS_DATA.map((fellowship) => {
                                const isActive = activeFellowshipSlug?.toLowerCase() === fellowship?.slug?.toLowerCase()
                                return (
                                    <Link href={`/fellowships/${fellowship.slug}`} key={fellowship.id} className={cn('flex px-3 py-2 items-center gap-3.5 hover:bg-neutral-100 rounded-lg text-neutral-600 text-sm', isActive && "bg-neutral-100 text-neutral-800")}>
                                    <Image src={fellowship.image} alt={fellowship.name} height={20} width={20} />
                                    <p className='text-neutral-800 font-medium text-sm truncate'>{fellowship.name}</p>
                                </Link>
                                )
                            })
                        }
                    </ul>
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



export interface FellowshipProp {
    id: number;
    name: string;
    slug: string;
    image: string
}

export const FELLOWSHIPS_DATA: FellowshipProp[] = [
    {
        id: 1,
        name: "The Redeemed Christian Church",
        slug: "redeem-christian-church",
        image: "/assets/fellowships/redeem.svg"
    },
    {
        id: 2,
        name: "Living Faith Church Worldwide",
        slug: "living-faith-church",
        image: "/assets/fellowships/living-faith.svg"
    },
    {
        id: 3,
        name: "Deeper Life Bible Church",
        slug: "deeper-life-church",
        image: "/assets/fellowships/deeper-life.svg"
    },
    {
        id: 4,
        name: "Christ Embassy",
        slug: "christ-embassy",
        image: "/assets/fellowships/christ-embassy.svg"
    },
    {
        id: 5,
        name: "Dunamis International Gospel Centre",
        slug: "dunamis-international",
        image: "/assets/fellowships/dunamis.svg"
    },
    {
        id: 6,
        name: "Daystar Christian Centre",
        slug: "daystar-christian-center",
        image: "/assets/fellowships/daystar.svg"
    },
    {
        id: 7,
        name: "The Elevation Church",
        slug: "elevation-church",
        image: "/assets/fellowships/elevation-church.svg"
    },
]