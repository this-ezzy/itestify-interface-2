import { Calendar, Globe03 } from '@untitled-ui/icons-react'
import React from 'react'

const AboutFellowship = () => {
    return (
        <div className='bg-neutral-50 p-4 rounded-2xl border-neutral-200 h-fit space-y-4'>
            <div>
                <h3 className='text-neutral-800 font-medium text-sm mb-2'>About this fellowship</h3>
                <p className='text-sm font-normal text-neutral-600'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, exercitationem aspernatur! Dolore dolorum magni explicabo consequatur laborum, suscipit, quidem voluptatum unde facere doloremque fugiat architecto accusantium temporibus doloribus exercitationem optio dignissimos nostrum! Nemo, delectus nam veniam, hic voluptatibus, voluptate iste necessitatibus perferendis animi sequi eos. Velit nostrum dolorum architecto hic commodi odit. Dolore impedit veritatis nisi cumque doloremque unde?
                </p>
                <div className='flex items-center gap-2 text-xs mt-4 mb-2'>
                    <Calendar className='size-4 text-neutral-600' />
                    <span>Created 25th September, 2025</span>
                </div>
                <div className='flex items-center gap-2 text-xs'>
                    <Globe03 className='size-4 text-neutral-600' />
                    <span>Public</span>
                </div>
            </div>
            <div className='border-t pt-4'>
                <h3 className='text-neutral-800 font-medium text-sm mb-2'>Fellowship Rules</h3>

                <ul className='list list-decimal text-sm text-neutral-600 pl-6 space-y-1'>
                    <li>Be excellent to one another</li>
                    <li>Don’t solicit or post illegal advice</li>
                    <li>Don’t post private information</li>
                    <li>No spam</li>
                    <li>Don’t post inaccurate and/or misleading information</li>
                    <li>Don’t post clickbait, or misleading titles or unneccesary images</li>
                    <li>AI generated content is not allowed</li>
                    <li>This is not your blog or instagram feed. Keep it short and respectful.</li>
                </ul>
            </div>
        </div>
    )
}

export default AboutFellowship