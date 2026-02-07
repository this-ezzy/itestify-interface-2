'use client'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { FELLOWSHIPS_DATA } from '../shared/layout/Sidebar'
import { CustomDropDown } from '../shared'
import { Bell03, BellOff03, Flag03, Heart } from '@untitled-ui/icons-react'

interface Props {
    fellowshipId: string
}

const FellowshipHeader = ({ fellowshipId }: Props) => {
    const [action, setAction] = useState<string | null>(null)
    const [isNotification, setIsNotification] = useState(false)
    const [isJoined, setIsJoined] = useState(false)

    const activeFellowship = useMemo(() => {
        const fellowship = FELLOWSHIPS_DATA.find((item) => item.slug === fellowshipId)
        return fellowship

    }, [fellowshipId])

    if (!activeFellowship) return <></>

    const handleAction = (action: string) => {
        console.log(action)
        setAction(action)

    }

    return (
        <div className='flex justify-between items-center pb-8 pt-12 w-full  relative border-b'>
            <Image src={activeFellowship?.image} alt={activeFellowship?.name} height={80} width={80} className='absolute left-0 -top-10' />
            <div>
                <h3 className='text-xl font-bold text-neutral-800'>{activeFellowship?.name}</h3>
                <p className='flex items-center gap-2 text-sm font-medium text-neutral-600'>
                    <span>20.5k Witnesses</span>
                    <span aria-hidden className='mx-2'>•</span>
                    <span>100k Testimonies</span>
                </p>
            </div>
            <div className='flex items-center gap-2'>
                {
                    isJoined &&
                    <>

                        <Button className='rounded-[14px]'>
                            Share your testimony
                        </Button>

                        <button onClick={() => setIsNotification(!isNotification)} className="text-grey-100 bg-white flex items-center justify-center rounded-full size-10 border shadow relative z-10">
                            {
                                isNotification ?
                                    <BellOff03 />
                                    :
                                    <Bell03 />
                            }
                        </button>
                    </>
                }
                <Button onClick={() => setIsJoined(!isJoined)}>
                    {
                        isJoined ?
                            "Joined"
                            :
                            "Join"
                    }
                </Button>
                <CustomDropDown
                    value={action}
                    align="end"
                    onChange={handleAction}
                    items={[
                        {
                            value: "favourites",
                            icon: <Heart />,
                            label: <>Add to favorites</>,

                        },
                        {
                            value: "Report",
                            icon: <Flag03 />,
                            label: <>Report fellowship</>,
                        },

                    ]}
                    renderTrigger={(selected) => (
                        <button className="text-grey-100 bg-neutral-25 rounded-full size-10 border shadow relative z-10">•••</button>
                    )}
                    contentClassName="min-w-[200px]"
                />

            </div>

        </div>
    )
}

export default FellowshipHeader