import React from 'react'
import { NewPostModal } from '../../pages/private/feed/new-post/new-post-modal'
import { useModalContext } from '@/context/modal-context'
import { DeletePostModal } from '@/pages/private/feed/posts/delete-post-modal'
import { DeleteCommentModal } from '@/pages/private/feed/posts/comments/delete-comment-modal'

export const ModalContainer = () => {


    const { newPost, deletePost, deleteComment } = useModalContext()

    const shouldOpen = newPost.isOpen || deletePost.isOpen || deleteComment.isOpen

    if ( !shouldOpen ) return null
    return (
        <div className='z-50 w-screen fixed h-screen pt-10 max-md:pt-0 bg-secondary-800/50  flex items-start justify-center'>
            {newPost.isOpen && <NewPostModal />}
            {deletePost.isOpen && <DeletePostModal />}
            {deleteComment.isOpen && < DeleteCommentModal />}
        </div>
    )
}
