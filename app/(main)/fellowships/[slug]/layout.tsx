import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const FellowshipLayout = ({ children }: Props) => {
    return (
        <div className='w-full px-0'>{children}</div>
    )
}

export default FellowshipLayout