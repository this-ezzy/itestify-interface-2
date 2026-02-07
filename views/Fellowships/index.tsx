import { AboutFellowship, FellowshipBanner, FellowshipBody, FellowshipHeader } from '@/components/Fellowships'
import React from 'react'

interface Props {
    fellowshipId: string
}

const FellowshipView = ({ fellowshipId }: Props) => {
    return (
        <div className=''>
            <FellowshipBanner />
            <section className='max-w-app-main mx-auto px-4'>
                <FellowshipHeader fellowshipId={fellowshipId} />
                <div className="grid grid-cols-[1fr_350px] gap-8 mt-8">
                    <FellowshipBody />
                    <AboutFellowship />
                </div>

            </section>
        </div>
    )
}

export default FellowshipView