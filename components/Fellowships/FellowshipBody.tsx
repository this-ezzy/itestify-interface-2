'use client'
import React, { useState } from 'react'
import { FeedSorting } from '../shared'
import PostCard, { CardType } from '../shared/Feed/PostCard'
import Link from 'next/link'

const FellowshipBody = () => {
    const [sortBy, setSortBy] = useState<"trending" | "new" | "top">("trending")
    const [layout, setLayout] = useState<CardType>("card")

    return (
        <div>
            <FeedSorting
                sortBy={sortBy}
                setLayout={setLayout}
                layout={layout}
                setSortBy={setSortBy}
                className=' mb-2'
            />

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
                        className='pt-4'
                        imageClassName='max-w-full'
                        bodyClassName='max-w-full'

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
                        className='pt-4'
                        cardType={layout}
                        imageClassName='max-w-full'
                    />
                </Link>


            </ul>
        </div>
    )
}

export default FellowshipBody