import { usePostContext } from '@/context/post-context'
import React from 'react'

import * as Icon from "@phosphor-icons/react"
import { useModalContext } from '@/context/modal-context'
import { PostProps } from '@/types/post'
import { copyToClipboard } from '@/utils/copy-to-clipboard'
import { useToasts } from '@/hooks/use-toasts';

interface ModalPostOptionsProps {

    post: PostProps
    showOptionsMenu: boolean
    setShowOptionsMenu: React.Dispatch<React.SetStateAction<boolean>>

}

export const ModalPostOptions = ( { post, showOptionsMenu, setShowOptionsMenu }: ModalPostOptionsProps ) => {

    const { copyPostToClipBoardNotify, savePostNofity } = useToasts()
    const { setPostId } = usePostContext()
    const { deletePost } = useModalContext()

    const menuRef = React.useRef<HTMLDivElement | null>( null );

    React.useEffect( () => {
        function handleClickOutside( event: MouseEvent ) {
            if ( menuRef.current && !menuRef.current.contains( event.target as Node ) ) {
                setShowOptionsMenu( false );
            }
        }

        document.addEventListener( "mousedown", handleClickOutside, true );
        return () => {
            document.removeEventListener( "mousedown", handleClickOutside, true );
        };
    }, [] );


    if ( !showOptionsMenu ) return null
    return (

        <div
            ref={menuRef}
            onClick={() => setPostId( post.id )}
            className='absolute flex items-start justify-start flex-col gap-2 right-5 top-3 px-2 py-4 w-fit shadow-sm border bg-secondary-50 rounded-sm'>
            <p
                onClick={() => {
                    copyToClipboard( "/post", post.id )
                    copyPostToClipBoardNotify()
                }}
                className='h-8 hover:bg-secondary-200 hover:rounded-sm w-full active:bg-primary-400 active:text-secondary-50 duration-150 gap-2 transition-all cursor-pointer p-1 flex items-center justify-start'>
                <Icon.Copy size={24} weight='light' className='fill-secondary-800' />
                Copiar link da publicação
            </p>
            <p
                onClick={() => savePostNofity()}
                className='h-8 hover:bg-secondary-200 hover:rounded-sm w-full gap-2 transition-all cursor-pointer p-1 flex items-center justify-start'>
                <Icon.BookmarkSimple size={24} weight='light' className='fill-secondary-800' />
                Salvar publicação
            </p>
            {post.is_author &&
                <p
                    onClick={async () => deletePost.open()}
                    className='h-8 hover:bg-secondary-200 hover:rounded-sm w-full  gap-2 transition-all cursor-pointer  p-1 flex items-center justify-start'>
                    <Icon.Trash size={24} weight='light' className='fill-secondary-800' />
                    Deletar publicação
                </p>}

        </div>
    )


}
