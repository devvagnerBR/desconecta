import { useUserContext } from '@/context/user-context'
import { Avatar } from '@/components/header/avatar'
import * as Icon from "@phosphor-icons/react"
import { newPostModalBusiness } from './new-post-modal-business';

import { useModalContext } from '@/context/modal-context';
import { PostType } from '@/requests/post-requests';
import React from 'react';

export const NewPostModal = () => {

    const { data } = useUserContext()
    const { register, contentLength, onSubmit } = newPostModalBusiness()
    const { newPost } = useModalContext()



    return (
        <form onSubmit={onSubmit} className='w-screen  max-w-3xl max-h-[320px] max-md:max-h-none h-screen bg-white rounded-sm shadow-sm px-4'>
            <header className='w-full h-16 mt-2 flex items-center justify-between '>
                <div className='flex gap-2 items-center'>
                    {data && <Avatar data={data} />}
                    <div className='flex flex-col leading-none gap-1'>
                        <p className='text-lg leading-none font-semibold'>
                            <span className='text-primary-400 font-bold text-base leading-none'>@</span>
                            {data?.username}
                        </p>
                        <div className='flex items-center justify-end'>
                            <p className="shrink-0 leading-none text-sm text-secondary-600">Compatilhar como:</p>
                            <select
                                {...register( 'type' )}
                                className="shrink-0 cursor-pointer text-secondary-800 font-light text-sm">
                                <option value={PostType.PUBLIC}>Global</option>
                                <option value={PostType.COURSE}>Curso</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='h-full mt-2'>
                    <Icon.X
                        onClick={newPost.close}
                        size={26}
                        className='fill-secondary-800 hover:bg-secondary-400 items-start justify-start transition-all duration-300 rounded-full cursor-pointer'
                        weight='light' />
                </div>
            </header>
            <main className='w-full mt-4'>
                <textarea
                    {...register( 'content' )}
                    placeholder='Compartilhe algo novo ...'
                    maxLength={600}
                    className='placeholder:font-light text-primary-400 text rounded-sm w-full max-sm:max-h-80 max-sm:h-80 h-40 min-h-[160px] max-sm:min-h-[320px]  max-h-40 p-2'>
                </textarea>
                <div className='flex items-end justify-between mt-4 gap-2'>

                    <p className='text-secondary-600'>total de caracteres: {contentLength ?? '0'} /<span className='text-secondary-600'> 600</span> </p>
                    <button className='bg-primary-400 rounded-sm h-10 border rounded-l-none border-primary-400 text-secondary-50 font-semibold text-lg px-4'>
                        Postar
                    </button>
                </div>
            </main>
        </form>
    )
}
