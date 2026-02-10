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
    return (
        <Select
            value={value}
            onValueChange={(val) => onChange?.(Number(val))}
        >
            <SelectTrigger
                className={cn(
                    'w-50 rounded-full bg-neutral-50 border-none',
                    className
                )}
            >
                <SelectValue placeholder="Select Fellowship" />
            </SelectTrigger>

            <SelectContent>
                {fellowShips.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                        <div className="flex items-center gap-2">
                            {item.icon && (
                <Image
                                    src={item.icon}
                                    width={18}
                                    height={18}
                                    alt={item.name}
                />
                            )}
                            <span>{item.name}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

/* ---------------------------------- DATA ---------------------------------- */

const fellowShips: Fellowship[] = [
    { id: '1', name: 'Health/Healing', icon: '/assets/medical-cross.svg' },
    { id: '2', name: 'Finances', icon: '/assets/coins-stacked-03.svg' },
    { id: '3', name: 'Family', icon: '/assets/heart-square.svg' },
    { id: '4', name: 'Job', icon: '/assets/briefcase-01.svg' },
    { id: '5', name: 'Japa/Relocation', icon: '/assets/plane.svg' },
    { id: '6', name: 'Marriage', icon: '/assets/heart.svg' }
]
