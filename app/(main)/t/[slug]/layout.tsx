import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const DetailsLayout = ({ children }: Props) => {
    return (
        <div className='max-w-139.5 mx-auto px-4 lg:px-10'>{children}</div>
    )
}

export default DetailsLayout