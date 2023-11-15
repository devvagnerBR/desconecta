import React from 'react'
import { PostProps } from '../posts-business'

export const Comments = ( { post }: { post: PostProps } ) => {

    const comments = post?.comments

    return (
        <section>
            {comments?.map( ( comment ) => {
                return (
                    <section key={`${comment.author.id}+${comment.created_at}+${Math.random()}`} className=' mt-1 p-2  border rounded-md  flex flex-col items-start gap-4'>
                        <div className='flex gap-2'>
                            <img src={comment.author.avatar} alt="" className='w-10 h-10 rounded-full' />
                            <div className='flex flex-col w-full'>
                                <p className='text-secondary-800 text-lg font-semibold leading-5'>{comment.author.username}</p>
                                <p className='text-secondary-800/70 font-light text-xs'>{comment.author.curso}</p>
                            </div>
                        </div>
                        <main className='pl-12 flex flex-wrap  w-full '>
                            <p className=' flex  flex-wrap '>{comment.content}</p>
                        </main>
                        <div className='w-full flex gap-2  pl-12'>
                            <button className='text-xs text-secondary-600'>Gostei</button>
                            <p className='text-sm text-secondary-600'>|</p>
                            <button className='text-xs text-secondary-600'>Responder</button>
                        </div>
                    </section>
                )
            } )}
        </section>
    )
}
