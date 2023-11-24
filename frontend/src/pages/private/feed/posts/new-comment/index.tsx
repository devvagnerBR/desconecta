import { Avatar } from '@/components'
import { useUserContext } from '@/context/user-context'
import React from 'react'
import { newCommentBusiness } from './new-comment-business'

export const NewComment = ( { postId }: { postId: string } ) => {

    const { data: user } = useUserContext()
    const { handleChange, createComment, comment } = newCommentBusiness( postId )

    return (
        <section className='mt-4 flex items-center gap-4 pl-2'>
            <img src={user?.avatar} alt="" className='w-10 h-10 rounded-full' />
            <form
                onSubmit={( event ) => {
                    event.preventDefault();
                    createComment.mutate();
                }}
                className='flex w-full gap-2'>
                <input
                    onChange={handleChange}
                    value={comment || ''}
                    maxLength={600}
                    type="text"
                    className='text-primary-400 font-semibold w-full h-10 rounded-sm border border-secondary-400 px-2'
                />
                <button
                    type="submit"
                    className='w-24 px-2 bg-primary-400 rounded-sm h-10 border rounded-l-none border-primary-400 text-secondary-50 font-semibold text-lg'>
                    Comentar
                </button>
            </form>
        </section >
    )
}
