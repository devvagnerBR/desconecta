import { useModalContext } from '@/context/modal-context'
import React from 'react'
import { PostBusiness } from '../posts-business'
import { usePostContext } from '@/context/post-context'

export const DeletePostModal = () => {

    const { deletePost } = useModalContext()
    const { deletePostMutation } = PostBusiness()
    const { postId } = usePostContext()


    return (
        <div className='w-96 max-md:mt-4 max-md:w-full max-md:m-2 max-md:h-fit flex flex-col items-center justify-start py-4  px-2 h-44 border bg-secondary-50 rounded-sm'>
            <h1 className='text-xl font-semibold'>Você quer excluir a publicação?</h1>
            <h2 className='text-center text-sm leading-4 mt-2 text-secondary-600'>Você tem certeza que quer excluir essa publicação permanentemente?</h2>
            <div className='mt-4 gap-4 flex items-center justify-center  pt-4 w-full border-t'>
                <button
                    onClick={() => deletePost.close()}
                    className='border border-secondary-800 text-secondary-800 font-semibold p-3 rounded-sm hover:shadow-sm'>Cancelar</button>
                <button
                    onClick={() => deletePostMutation( postId! )}
                    className='border p-3 rounded-sm hover:shadow-sm bg-primary-400 border-primary-400 text-secondary-50 font-medium'>Excluir</button>
            </div>
        </div >
    )
}
