'use client'
import { FeedSorting, PostCard, PostCardSkeleton } from '@/components/shared'
import { TestimonyComposer } from '@/components/Testimony'
import { Button } from '@/components/ui/button'
import { Briefcase01, ChevronRightDouble, CoinsStacked03, Heart, HeartSquare, MedicalCross, Plane, Plus, TrendUp01 } from '@untitled-ui/icons-react'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'

import { toggleTestimonyModal } from '@/Redux/Slices/testimonySlice'
import { useAppDispatch } from '@/Redux/store'
import Link from 'next/link'
import { CardType } from '@/components/shared/Feed/PostCard'
import useInViewport from '@/hooks/useInViewPort'
import { updateShowNavTestimonyButton } from '@/Redux/Slices/appSlice'
import { useCreateTestimony, useGetTestimoniesByTopics, useGetTestimoniesFeed, useSearchTestimonies } from '@/app/api/hooks/testimony'
import { TestimonyPayload } from '@/app/api/hooks/testimony/types'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useGetParams } from '@/hooks'
import useAuthenticateUser from '@/hooks/useAuthenticateUser'

const Index = () => {
    const { authenticateUser } = useAuthenticateUser()
    const [sortBy, setSortBy] = useState<"trending" | "new" | "top">("trending")
    const [layout, setLayout] = useState<CardType>("card")
    const { topic, q } = useGetParams(["topic", "q"])
    const isTopicMode = Boolean(topic)
    const isSearchMode = Boolean(q)

    const {
        data: searchData,
        isLoading: isSearchLoading,
        fetchNextPage: fetchNextSearchPage,
        hasNextPage: hasSearchNextPage,
        isFetchingNextPage: isFetchingSearchNextPage,
    }
        = useSearchTestimonies({
            q
        }, { enabled: !!q })

    const {
        data: feedData,
        isLoading: isFeedLoading,
        fetchNextPage: fetchFeedNextPage,
        hasNextPage: hasFeedNextPage,
        isFetchingNextPage: isFetchingFeedNextPage,
    } = useGetTestimoniesFeed({}, { enabled: !isTopicMode })

    const {
        data: topicData,
        isLoading: isTopicLoading,
        fetchNextPage: fetchTopicNextPage,
        hasNextPage: hasTopicNextPage,
        isFetchingNextPage: isFetchingTopicNextPage,
    } = useGetTestimoniesByTopics(
        { id: topic },
        { enabled: isTopicMode }
        )


    /* ---------------- ACTIVE SOURCE RESOLUTION ---------------- */

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useMemo(() => {
        if (isSearchMode) {
            return {
                data: searchData,
                isLoading: isSearchLoading,
                fetchNextPage: fetchNextSearchPage,
                hasNextPage: hasSearchNextPage,
                isFetchingNextPage: isFetchingSearchNextPage,
            }
        }

        if (isTopicMode) {
            return {
                data: topicData,
                isLoading: isTopicLoading,
                fetchNextPage: fetchTopicNextPage,
                hasNextPage: hasTopicNextPage,
                isFetchingNextPage: isFetchingTopicNextPage,
            }
        }

        return {
            data: feedData,
            isLoading: isFeedLoading,
            fetchNextPage: fetchFeedNextPage,
            hasNextPage: hasFeedNextPage,
            isFetchingNextPage: isFetchingFeedNextPage,
        }
    }, [isSearchMode, isTopicMode, feedData, isFeedLoading, fetchFeedNextPage, hasFeedNextPage, isFetchingFeedNextPage, searchData, isSearchLoading, fetchNextSearchPage, hasSearchNextPage, isFetchingSearchNextPage, topicData, isTopicLoading, fetchTopicNextPage, hasTopicNextPage, isFetchingTopicNextPage])

    const { ref, isInViewport } = useInViewport<HTMLButtonElement>();
    const {
        ref: loadMoreRef,
        isInViewport: isLoadMoreVisible
    } = useInViewport<HTMLDivElement>()

    const dispatch = useAppDispatch()

    const { mutateAsync: handleTestimonyUpload, isPending } = useCreateTestimony()

    const handleCreateTestimony = () => {
        if (!authenticateUser()) return
        dispatch(toggleTestimonyModal())
    }



    useEffect(() => {
        if (isInViewport) {
            dispatch(updateShowNavTestimonyButton(false))
        } else {
            dispatch(updateShowNavTestimonyButton(true))

        }
    }, [dispatch, isInViewport])


    useEffect(() => {
        if (isLoadMoreVisible && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [isLoadMoreVisible, hasNextPage, isFetchingNextPage, fetchNextPage])

    const handlePostTestimony = async (payload: TestimonyPayload) => {
        await handleTestimonyUpload(payload, {
            onSuccess: () => {
                toast.success("🙌 Posted! May your testimony strengthen someone’s faith today.")
            }
        })
    }

    const testimonies =
        data?.pages?.flatMap((page) => page.results) ?? []

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
                    {
                        isLoading ?
                            <ul className='space-y-4'>
                                {
                                    [1, 2, 3, 4, 5].map((item) => (
                                        <PostCardSkeleton key={item} className='pt-4' />
                                    ))
                                }
                            </ul>
                            :
                            <>
                                {
                                    testimonies.length > 0 ?
                                        <ul className='flex flex-col gap-4'>
                                            {
                                                testimonies.map((item) => (
                                                    <Link href={`/t/${item.id}`} key={item.id}>
                                                        <PostCard
                                                            className='pt-4'
                                                            cardType={layout}
                                                            testimony={item}
                                                        />
                                                    </Link>
                                                ))
                                            }
                                            <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
                                                {isFetchingNextPage && (
                                                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                                                        <Loader2 className="animate-spin size-4" />
                                                    </div>
                                                )}
                                            </div>
                                        </ul>
                                        :
                                        <NoFeed />
                                }

                            </>
                    }
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
                onPost={handlePostTestimony}
                onSaveDraft={() => console.log('save')}
                onSchedule={() => console.log('schedule')}
                isPosting={isPending}
            />
        </div>
    )
}

export default Index


export const trendingFellowships = [
    {
        id: '1',
        title: 'Health/Healing',
        icon: MedicalCross,
        color: "#3B7C0F"
    },
    {
        id: '2',
        title: 'Finance',
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



const NoFeed = () => {
    return (
        <div className='text-center text-xl'>
            Sorry, No feeds yet
        </div>
    )
}