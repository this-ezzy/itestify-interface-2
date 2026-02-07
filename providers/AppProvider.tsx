import { AuthModal, Navbar, Sidebar } from '@/components/shared'
import React, { ReactNode } from 'react'
import QueryProvider from './QueryProvider'
import ReduxProvider from './ReduxProvider'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AboutItestify } from '@/components/About';

interface Props {
    children: ReactNode
}

const AppProvider = ({ children }: Props) => {
    return (
        <GoogleOAuthProvider clientId="<your_client_id>">

            <QueryProvider>
                <ReduxProvider>
                    <div className="flex h-svh flex-col overflow-hidden">
                        <Navbar />
                        <main className="flex flex-1 overflow-hidden relative">
                            <Sidebar />

                            <section className="flex-1 overflow-y-auto relative  ">
                                {children}
                                <div className='h-16'></div>
                            </section>

                        </main>
                        <AuthModal />
                        <AboutItestify />
                    </div>
                </ReduxProvider>
            </QueryProvider>
        </GoogleOAuthProvider>
    )
}

export default AppProvider