import React from 'react'
import { NewPostInput } from '@/pages/private/feed/new-post/new-post-input'
import { Posts } from './posts'



export const Feed = () => {

    return (
        <div className='border min-h-full h-fit w-full  py-4 px-2 bg-secondary-200'>
            <NewPostInput />
            <Posts />
        </div>
    )
}
