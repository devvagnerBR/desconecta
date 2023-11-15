import { Avatar } from '@/components'
import React from 'react'
import { CardPostProps } from '../card-post'
import { PostProps } from '../posts-business'

export const NewComment = ( { post }: {  post: PostProps } ) => {

    const author = post?.author
    const comments = post?.comments

    return (
        <section className='mt-4 flex items-center gap-4 pl-2'>
            <Avatar size={10} data={author} />
            <div className='flex w-full gap-2'>
                <input maxLength={600} type="text" className='text-primary-400 font-semibold w-full h-10 rounded-sm border border-secondary-400 px-2' />
                <button
                    type="submit"
                    className='w-24  px-2 bg-primary-400 rounded-sm h-10 border rounded-l-none border-primary-400 text-secondary-50 font-semibold text-lg'>
                    Comentar
                </button>
            </div>
        </section>
    )
}
