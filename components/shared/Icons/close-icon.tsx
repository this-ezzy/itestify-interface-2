import React from 'react'


interface Props {
    className?: string
}

const CloseIcon = ({ className }: Props) => {
    return (
        <svg width="16" height="16" className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5718 3.42822L3.42871 12.5714" stroke="currentColor" strokeWidth="2.05714" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.42871 3.42798L12.5721 12.5714" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export default CloseIcon