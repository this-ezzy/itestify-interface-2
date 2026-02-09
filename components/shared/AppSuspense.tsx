
import React, { Suspense } from 'react'


interface AppSuspenseProps {
    children: React.ReactNode;
}

const AppSuspense = ({ children }: AppSuspenseProps) => {
    return (
        <Suspense>
            {children}
        </Suspense>
    )
}

export default AppSuspense