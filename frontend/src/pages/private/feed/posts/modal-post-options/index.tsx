import { usePostContext } from '@/context/post-context'
import React from 'react'
import { PostBusiness } from '../posts-business'
import * as Icon from "@phosphor-icons/react"
import { useModalContext } from '@/context/modal-context'
import { PostProps } from '@/types/post'

interface ModalPostOptionsProps {

    post: PostProps
    showOptionsMenu: boolean
    setShowOptionsMenu: React.Dispatch<React.SetStateAction<boolean>>

}

export const ModalPostOptions = ( { post, showOptionsMenu, setShowOptionsMenu }: ModalPostOptionsProps ) => {

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
            <p className='h-8 hover:bg-secondary-200 w-full  gap-2 transition-all cursor-pointer p-1 flex items-center justify-start'>
                <Icon.Copy size={24} weight='light' className='fill-secondary-800' />
                Copiar Link da publicação
            </p>
            <p className='h-8 hover:bg-secondary-200 w-full gap-2 transition-all cursor-pointer p-1 flex items-center justify-start'>
                <Icon.BookmarkSimple size={24} weight='light' className='fill-secondary-800' />
                Salvar publicação
            </p>
            {post.is_author &&
                <p
                    onClick={() => deletePost.open()}
                    className='h-8 hover:bg-secondary-200 w-full  gap-2 transition-all cursor-pointer  p-1 flex items-center justify-start'>
                    <Icon.Trash size={24} weight='light' className='fill-secondary-800' />
                    Deletar publicação
                </p>}

        </div>
    )


}
