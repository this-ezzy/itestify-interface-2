'use client'
import { FeedSorting, PostCard } from '@/components/shared'
import { TestimonyComposer } from '@/components/Testimony'
import { Button } from '@/components/ui/button'
import { Briefcase01, ChevronRightDouble, CoinsStacked03, Heart, HeartSquare, MedicalCross, Plane, Plus, TrendUp01 } from '@untitled-ui/icons-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { toggleTestimonyModal } from '@/Redux/Slices/testimonySlice'
import { useAppDispatch } from '@/Redux/store'
import Link from 'next/link'
import { CardType } from '@/components/shared/Feed/PostCard'
import useInViewport from '@/hooks/useInViewPort'
import { updateShowNavTestimonyButton } from '@/Redux/Slices/appSlice'


const Index = () => {
    const [sortBy, setSortBy] = useState<"trending" | "new" | "top">("trending")
    const [layout, setLayout] = useState<CardType>("card")
    const { ref, isInViewport } = useInViewport<HTMLButtonElement>();
    const dispatch = useAppDispatch()

    const [draft, setDraft] = useState({
        fellowshipId: "",
        title: '',
        content: '',
        showAvatar: true
    })

    const handleCreateTestimony = () => {
        dispatch(toggleTestimonyModal())
    }

    useEffect(() => {
        if (isInViewport) {
            dispatch(updateShowNavTestimonyButton(false))
        } else {
            dispatch(updateShowNavTestimonyButton(true))

        }
    }, [isInViewport])


    return (
        <div className='max-w-app-main mx-auto w-full space-y-6 px-4  lg:px-10 py-10'>
            <FeedSorting
                sortBy={sortBy}
                setLayout={setLayout}
                layout={layout}
                setSortBy={setSortBy}
            />

            <div className='grid md:grid-cols-[1fr_343px] md:gap-6'>
                <main className='w-full'>
                    <button ref={ref} onClick={handleCreateTestimony} className='mb-6 w-full flex items-center justify-between px-4 border   max-w-full! bg-neutral-50 rounded-2xl h-16!' >
                        <div className='flex items-center gap-2'>
                            <Image src='/assets/Avatars Default with Backdrop.svg' alt='smile icon' width={32} height={32} className='rounded-full mr-2' />
                            <span className='text-neutral-600 text-sm'>What are you grateful for?</span>
                        </div>
                        <span className=' bg-neutral-800 text-neutral-25 flex items-center justify-center rounded-full size-7!'>
                            <Plus className='size-4' />
                        </span>
                    </button>
                    <ul className='flex flex-col gap-4'>
                        <Link href={`/t/1`}>
                        <PostCard
                            author="{newusername}"
                            collaborators="{anotherusername}"
                            avatarUrl="/assets/Avatars Default with Backdrop.svg"
                            time="3 mins"
                            title="How Forgiveness Brought Peace Back Into My Home After Months of Conflict"
                            excerpt="There was so much tension between me and my husband that we barely spoke for weeks..."
                            imageUrl="/assets/Image.jpg"
                            category="Health & Healing"
                                className='pt-4'
                                cardType={layout}
                            />
                        </Link>
                        <Link href={`/t/2`}>
                        <PostCard
                            author="{newusername}"
                            avatarUrl="/assets/Avatars Default with Backdrop.svg"
                            time="3 mins"
                            title="I got the job!!!"
                            excerpt="There was so much tension between me and my husband that we barely spoke for weeks..."
                            category="Health & Healing"
                                className='pt-4'
                                cardType={layout}
                            />
                        </Link>


                    </ul>
                </main>
                <aside className='border md:block hidden rounded-2xl p-4  sticky top-2 h-fit'>
                    <h3 className='flex items-center gap-2 text-blue-60 text-sm font-medium'> <TrendUp01 /> Trending Fellowships</h3>

                    <ul className='mt-4'>
                        {trendingFellowships.map((fellowship) => {
                            return (
                                <li key={fellowship.id} className='flex items-center gap-2 mt-1 hover:bg-neutral-100 cursor-pointer py-2 px-3 rounded-lg'>
                                    <div className=' rounded-lg flex items-center justify-center' >
                                        <fellowship.icon style={{ color: fellowship.color }} />
                                    </div>
                                    <span className='text-sm font-normal text-neutral-800'>{fellowship.title}</span>
                                </li>
                            )
                        })
                        }
                    </ul>
                    <Button variant="secondary" className='w-full mt-4 rounded-[14px]'>See All <ChevronRightDouble /> </Button>
                </aside>
            </div>
            <TestimonyComposer
                value={draft}
                onChange={setDraft}
                onPost={() => console.log(draft)}
                onSaveDraft={() => console.log('save')}
                onSchedule={() => console.log('schedule')}
            />
        </div>
    )
}

export default Index


const trendingFellowships = [
    {
        id: '1',
        title: 'Health/Healing',
        icon: MedicalCross,
        color: "#3B7C0F"
    },
    {
        id: '2',
        title: 'Finances',
        icon: CoinsStacked03,
        color: "#E62E05"
    },
    {
        id: '3',
        title: 'Family',
        icon: HeartSquare,
        color: "#BA24D5"
    },
    {
        id: '4',
        title: 'Job',
        icon: Briefcase01,
        color: "#CA9802"
    },
    {
        id: '5',
        title: 'Japa/Relocation',
        icon: Plane,
        color: "#444CE7"
    },
    {
        id: '6',
        title: 'Marriage',
        icon: Heart,
        color: "#C11574"
    },
]