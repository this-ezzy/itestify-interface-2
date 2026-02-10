'use client'
import { useGetTestimonyDetails } from '@/app/api/hooks/testimony'
import { CommentCard, LoadingSpinner, PostCard, TextAreaField } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft } from '@untitled-ui/icons-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface Props {
    testimonyId: string
}

const Index = ({ testimonyId }: Props) => {
    const { data, isLoading } = useGetTestimonyDetails(testimonyId)
    const router = useRouter()
    const [focused, setFocused] = useState(false)
    const [value, setValue] = useState("")
    const expanded = focused || value.length > 0

    console.log(testimonyId, "id")
    console.log(data, "tst data")

    if (isLoading) {
        return (
            <div className='mt-8 flex justify-center'>
                <LoadingSpinner size={30} />
            </div>
        )
    }

    if (!data) return <></>
    return (
        <div className='space-y-8 py-10'>
            <button onClick={() => router.back()} className='flex items-center gap-2 '>
                <ArrowLeft /> Go Back
            </button>

            <PostCard
                author={data?.user.username}
                avatarUrl="/assets/Avatars Default with Backdrop.svg"
                title={data.title}
                excerpt={data.body}
                media={data.media ?? undefined}
                showFullBody={true}
                category={data.topics?.[0]?.name}
                className='border-t-0 border-b pb-8'
            />

            <section>
                <TextAreaField
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    label="Responses"
                    groupClassName='max-w-full gap-4'
                    className={cn('transition-all duration-200 bg-neutral-100 focus:bg-transparent',
                        expanded ? 'min-h-39 pb-16' : 'min-h-11.25 resize-none',)}
                    labelClassName='font-semibold text-neutral-800 text-base'
                    placeholder='Share your thought'
                    actions={
                        <div className={expanded ? "flex items-center gap-2" : "hidden"}>
                            <Button variant="secondary" className="rounded-[14px] h-10">
                                Cancel
                            </Button>
                            <Button className="rounded-[14px] h-10 ">
                                Comment
                            </Button>
                        </div>
                    }

                />
            </section>

            <ul className='space-y-4'>
                {/* <CommentCard
                    author="{newusername}"
                    avatarUrl="/assets/Avatars Default with Backdrop.svg"
                    time="3 mins"
                    excerpt="There was so much tension between me and my husband that we barely spoke for weeks. During one Sunday service, I felt a deep conviction to forgive and let go of pride. The next day, we talked, cried, and prayed together. "

                /> */}
                <NoComment />

            </ul>

            {/* <button className='text-sm font-semibold text-neutral-600 bg-none'>15 more comments ...</button> */}
        </div>
    )
}

export default Index




const NoComment = () => {
    return (
        <div className='h-32.75 w-full flex flex-col items-center'>
            <h4 className='text-neutral-900 font-medium text-base'>Help this conversation take off. </h4>
            <p className='text-neutral-600 text-sm mt-2'>Stand out by being an early commenter</p>
        </div>
    )
}