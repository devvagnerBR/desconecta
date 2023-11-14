import React from 'react'
import { NewPostModal } from '../modals/new-post-modal'

export const ModalContainer = () => {


  

    return (
        <div className='z-50 w-screen absolute h-screen pt-10 max-sm:pt-0 bg-secondary-800/50  flex items-start justify-center'>
            <NewPostModal />
        </div>
    )
}
