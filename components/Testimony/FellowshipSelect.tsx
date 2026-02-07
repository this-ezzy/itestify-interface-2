'use client'

import { Fellowship } from './types'
import { ListBox } from '../shared'
import { FC, useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'


export default function FellowshipSelect() {
    const [selectedFellowship, setSelectedFellowship] = useState<Fellowship | null>(null)
    return (
        <ListBox
            list={fellowShips}
            selectedItem={selectedFellowship}
            idField="id"
            onSelect={(value) => setSelectedFellowship(value)}
            ListItem={ListItem}
            placeholder='Select Fellowship'
            classes={{
                button: "max-w-[250px]",
                container: "max-w-[250px] rounded-full bg-neutral-50 border-none",
                options: "divide-0"
            }}
        />
    )
}



const ListItem: FC<{ item: Fellowship; className?: string }> = ({ item, className }) => {

    return (
        <div className={cn('flex w-full cursor-pointer items-center gap-2 text-base', className)}>
            {
                item.icon &&
                <Image
                    src={item.icon}
                    width={20}
                    height={20}
                    alt={item.name}
                />
            }
            <span className="block truncate text-neutral-900">{item.name}</span>
        </div>
    );
};




const fellowShips = [
    {
        id: '1',
        name: 'Health/Healing',
        icon: "/assets/medical-cross.svg",
    },
    {
        id: '2',
        name: 'Finances',
        icon: "/assets/coins-stacked-03.svg",
    },
    {
        id: '3',
        name: 'Family',
        icon: "/assets/heart-square.svg",
    },
    {
        id: '4',
        name: 'Job',
        icon: "/assets/briefcase-01.svg",
    },
    {
        id: '5',
        name: 'Japa/Relocation',
        icon: "/assets/plane.svg",
    },
    {
        id: '6',
        name: 'Marriage',
        icon: "/assets/heart.svg",
    },
]