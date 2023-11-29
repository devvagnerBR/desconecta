import React from 'react'
import { usePostContext } from '@/context/post-context';

export const ModalCommentsOptions = () => {

    const { setCommentId } = usePostContext()
    return (
        <div
            onClick={() => setCommentId( null )}>
            LALALALA
        </div>
    )
}
