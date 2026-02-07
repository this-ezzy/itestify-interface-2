import Image from 'next/image'
import React from 'react'

const LoadingSpinner = () => {
    return (
        <Image
            src="/assets/loader.svg"
            alt="Loading..."
            width={25}
            height={25}
            className='animate-spin duration-1000'
        />
    )
}

export default LoadingSpinner