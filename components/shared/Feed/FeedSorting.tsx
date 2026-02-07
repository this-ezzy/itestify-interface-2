import React from 'react'
import CustomDropDown from '../CustomDropDown'
import { ChevronDown, Rows02, Rows03 } from '@untitled-ui/icons-react'
import { CardType } from './PostCard'
import { cn } from '@/lib/utils'

interface Props {
    sortBy: "trending" | "new" | "top"
    setSortBy: React.Dispatch<React.SetStateAction<"trending" | "new" | "top">>
    layout: CardType
    setLayout: React.Dispatch<React.SetStateAction<CardType>>
    className?: string
}

const FeedSorting = ({ sortBy, setSortBy, layout, setLayout, className }: Props) => {


    return (
        <header className={cn('flex items-center gap-2', className)}>
            <span className='flex items-center gap-1 text-sm font-medium text-neutral-600'>

                <CustomDropDown
                    value={sortBy}
                    onChange={setSortBy}
                    items={[
                        { value: "trending", label: "Trending" },
                        { value: "new", label: "New" },
                        { value: "top", label: "Top" },
                    ]}
                    renderTrigger={(selected) => (
                        <div className="flex items-center gap-0.5 text-sm font-medium text-neutral-900 min-w-22 cursor-pointer">
                            {selected?.label ?? "Trending"}
                            <ChevronDown />
                        </div>
                    )}
                    contentClassName="min-w-[200px]"
                />


            </span>
            <span className='flex items-center gap-1 text-sm font-medium text-neutral-600'>

                <CustomDropDown
                    value={layout}
                    onChange={setLayout}
                    items={[
                        {
                            value: "card",
                            icon: <Rows02 className='text-neutral-600 size-4' />,
                            label: <>Card</>,
                        },
                        {
                            value: "compact",
                            icon: <Rows03 className='text-neutral-600 size-4' />,
                            label: <>Compact</>,
                        },
                    ]}
                    renderTrigger={(selected) => (
                        <div className="flex h-12  items-center gap-0.5 text-sm font-medium text-neutral-900 cursor-pointer" >
                            {selected?.icon}
                            <ChevronDown />
                        </div>
                    )}
                    contentClassName="min-w-[180px]"
                />


            </span>
        </header>
    )
}

export default FeedSorting