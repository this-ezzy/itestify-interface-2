import { AuthModal, Navbar, Sidebar } from '@/components/shared'
import React, { ReactNode } from 'react'
import QueryProvider from './QueryProvider'
import ReduxProvider from './ReduxProvider'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AboutItestify } from '@/components/About';
import AppSuspense from '@/components/shared/AppSuspense';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from "@/components/ui/tooltip"

interface Props {
    children: ReactNode
}

const AppProvider = ({ children }: Props) => {
    return (
        <GoogleOAuthProvider clientId="<your_client_id>">
            <QueryProvider>
                <AppSuspense>
                    <ReduxProvider>
                        <Toaster position='top-center' />
                        <TooltipProvider>
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
                        </TooltipProvider>
                    </ReduxProvider>
                </AppSuspense>
            </QueryProvider>
        </GoogleOAuthProvider>
    )
}

export default AppProvider