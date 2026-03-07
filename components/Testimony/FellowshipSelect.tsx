'use client'

import Image from 'next/image'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useGetAllTopics } from '@/app/api/hooks/topics'
import { trendingFellowships } from '@/views/Home'

export interface Fellowship {
    id: string
    name: string
    icon?: string
}

interface Props {
    value?: string
    onChange?: (id: number) => void
    className?: string
}

export default function FellowshipSelect({
    value,
    onChange,
    className
}: Readonly<Props>) {
    const { data: topicsData, isLoading } = useGetAllTopics()
    return (
        <Select
            value={value}
            onValueChange={(val) => onChange?.(Number(val))}
        >
            <SelectTrigger
                className={cn(
                    'min-w-40 rounded-full bg-neutral-100 border-none',
                    className
                )}
            >
                <SelectValue placeholder="Select Fellowship" />
            </SelectTrigger>

            <SelectContent>
                {topicsData?.map((item) => {
                    const Icon = trendingFellowships.find((topic) => topic.title.toLowerCase() === item.name.toLowerCase())
                    return (
                        <SelectItem key={item.id} value={item.id.toString()}>
                        <div className="flex items-center gap-2">
                                {Icon &&
                                    <Icon.icon style={{ color: Icon.color }} />
                                }
                            <span>{item.name}</span>
                        </div>
                    </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}
