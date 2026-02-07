import Image from 'next/image'
import React from 'react'

const FellowshipBanner = () => {
    return (
        <div className='h-45.75 w-full  relative'>
            <Image src="/assets/fellowships/fellowship-header-bg.png" fill alt='fellowship-header-bg' />
        </div>
    )
}

export default FellowshipBanner