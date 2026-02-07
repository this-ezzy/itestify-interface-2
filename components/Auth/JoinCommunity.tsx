import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { useAppDispatch } from '@/Redux/store'
import { setActiveAuthMethod, toggleAuthModal } from '@/Redux/Slices/authSlice'

const JoinCommunity = () => {
    const dispatch = useAppDispatch()

    const takeMeToFeed = () => {
        // Logic to navigate to the feed
        dispatch(toggleAuthModal())
        dispatch(setActiveAuthMethod("login"))
    }

    return (
        <div className='flex flex-col items-center gap-6'>
            <ul className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  overflow-y-auto px-4 py-2'>
                {communitiesData.map(community => (
                    <Item key={community.id} community={community} />
                ))}
            </ul>


            <Button onClick={takeMeToFeed} variant="link" className='text-center underline cursor-pointer underline-offset-2'>I’ll do this later, take me to the feed</Button>
        </div>
    )
}

export default JoinCommunity

interface ItemProps {
    community: {
        id: number
        name: string
        size: string
    }
}


const Item = ({ community }: ItemProps) => {
    const [isJoined, setIsJoined] = React.useState(false)

    const handleJoinClick = () => {
        setIsJoined(!isJoined)
    }

    return (
        <li key={community.id} className='flex flex-col items-start  mb-4 bg-neutral-50 rounded-2xl p-3 w-full'>
            <div className='w-full flex items-center justify-between mb-3.5' >
                <span className='rounded-full bg-nameless-100 size-9'></span>
                <Button className={cn(' cursor-pointer text-white  font-bold rounded-[14px] px-3 py-1! text-xs h-7!', isJoined && "bg-error-10! hover:bg-error-10! hover:text-error-50! text-error-50!")} onClick={handleJoinClick} >
                    {isJoined ? 'Leave' : 'Join'}
                </Button>
            </div>
            <span className='text-sm font-medium text-neutral-700 truncate w-full'>{community.name}</span>
            <span className='text-xs text-neutral-500'>{community.size}</span>
        </li>
    )
}



const communitiesData = [
    {
        id: 1,
        name: "The Redeemed Christian Church",
        size: "724,621 Witnesses",
    },
    {
        id: 2,
        name: "Deeper Life Bible Church",
        size: "1,000,000 Witnesses",
    },
    {
        id: 3,
        name: "Dunamis International Gospel Centre",
        size: "800,200 Witnesses",
    },
    {
        id: 4,
        name: "Living Faith Church Worldwide",
        size: "400,200 Witnesses",
    },
    {
        id: 5,
        name: "Christ Embassy",
        size: "100,000 Witnesses",
    },
    {
        id: 6,
        name: "Daystar Christian Centre",
        size: "300,000 Witnesses",
    },
]