'use client'
import React from 'react'
import CustomDialog from '../shared/Modals/CustomDialog'
import { useAppDispatch, useAppSelector } from '@/Redux/store'
import { toggleShowAboutModal } from '@/Redux/Slices/appSlice'
import { cn } from '@/lib/utils'
import { ITestifyLogo } from '../shared'

const AboutItestify = () => {
    const { showAboutModal } = useAppSelector((state) => state.app)
    const dispatch = useAppDispatch()

    const onClose = () => {
        dispatch(toggleShowAboutModal(false))
    }

    return (
        <CustomDialog
            isOpen={showAboutModal}
            onClose={onClose}
            contentClassName={cn('md:max-w-[550px] rounded-[30px] gap-0 p-8', "bg-[linear-gradient(180deg,var(--gradient-start)_0%,var(--gradient-mid)_44%),url('/assets/Mosaic.png')] bg-repeat bg-contain bg-center")}

        >

            <div className='flex flex-col items-center gap-8'>
                <div className='flex flex-col items-center gap-2 p-2'>
                    <ITestifyLogo />
                    <h3 className='font-medium text-lg text-neutral-800'>About iTestify</h3>
                </div>
                <p className='text-neutral-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales.

                </p>
                <p>

                    Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. </p>
            </div>

        </CustomDialog>
    )
}

export default AboutItestify