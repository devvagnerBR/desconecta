import { momentJs } from '@/libs/moment-js'
import { PostProps } from '@/types/post'
import * as Icon from '@phosphor-icons/react'
import { PostBusiness } from '../posts-business'
import { useUserContext } from '@/context/user-context'
import React from 'react'
import { usePostContext } from '@/context/post-context'
import { useModalContext } from '@/context/modal-context'


export const Comments = ( { post }: { post: PostProps } ) => {

    const comments = post?.comments
    const isPostAuthor = post.is_author
    const { data: user } = useUserContext()
    const { setCommentId } = usePostContext()
    const { handleToggleLike } = PostBusiness()
    const { deleteComment } = useModalContext()


    const [openMenuId, setOpenMenuId] = React.useState<string | null>( null );
    const menuRef = React.useRef<HTMLDivElement | null>( null );
    const iconRef = React.useRef<SVGSVGElement | null>( null );

    React.useEffect( () => {
        function handleClickOutside( event: MouseEvent ) {
            if ( iconRef.current && iconRef.current.contains( event.target as Node ) ) {
                return;
            } else if ( menuRef.current && !menuRef.current.contains( event.target as Node ) ) {
                
            }
        }
        document.addEventListener( "mousedown", handleClickOutside, true );
        return () => {
            document.removeEventListener( "mousedown", handleClickOutside, true );
        };
    }, [] );



    if ( !comments ) return null
    return (
        <section className='mt-2'>
            {comments?.map( ( comment ) => {

                const isLiked = user && comment.likes.includes( user?.id )
                const isCommentAuthor = comment.is_author

                return (
                    <section key={`${comment.author.id}+${comment.created_at}+${Math.random()}`} className='relative pl-2 pt-2 mt-2 border-t  flex flex-col items-start gap-2'>

                        {openMenuId === comment.id &&
                            <div
                                ref={menuRef}
                                onClick={() => {
                                    setCommentId( comment?.id )
                                    setOpenMenuId( null )
                                }}
                                className='absolute right-1 top-2 flex items-start justify-start flex-col gap-2 px-2 py-4 w-fit shadow-sm border bg-secondary-50 rounded-sm'>
                                {( isPostAuthor || isCommentAuthor ) &&
                                    <p
                                        onClick={() => deleteComment.open()}
                                        className='h-3 hover:bg-secondary-200 w-full  gap-2 transition-all cursor-pointer p-1 flex items-center justify-start'>
                                        <Icon.Copy size={24} weight='light' className='fill-secondary-800' />
                                        Excluir comentario
                                    </p>}
                            </div>
                        }

                        <div className='flex gap-2 w-full'>
                            <img src={comment.author.avatar} alt="" className='w-6 h-6 rounded-full' />
                            <div className='flex flex-col w-full'>
                                <div className=' flex items-end gap-2  w-full'>
                                    <p className='text-secondary-800 text-base font-medium leading-3'>{comment.author.username}</p>
                                    <p className='order-2 text-xs font-light items-end leading-3 text-secondary-600'>
                                        {momentJs( comment?.created_at ).fromNow()}
                                    </p>
                                </div>
                                <p className='text-secondary-800/70 font-light text-xs'>{comment.author.course.name}</p>
                            </div>
                            <div className='h-4 flex justify-center pr- cursor-pointer'>
                                {( isPostAuthor || isCommentAuthor ) &&
                                    <Icon.DotsThree
                                        ref={iconRef}
                                        onClick={( event ) => {
                                            event.stopPropagation();
                                            if ( openMenuId === comment.id ) setOpenMenuId( null );
                                            else setOpenMenuId( comment.id );
                                        }}
                                        weight='bold' size={28} className='fill-secondary-800' />
                                }
                            </div>
                        </div>
                        <main className='flex flex-wrap  w-full'>
                            <p style={{ wordBreak: 'break-all' }} className=' text-sm flex text-secondary-800  flex-wrap'>{comment?.content}</p>
                        </main>


                        <div
                            onClick={() => handleToggleLike( comment.id )}
                            className='w-fit flex items-center gap-1 cursor-pointer'>
                            <Icon.ThumbsUp size={16} className={` ${isLiked ? "fill-primary-400" : "fill-secondary-600"}  transform scale-x-[-1]`} />
                            {isLiked ?
                                <p className={` ${isLiked ? "text-primary-400" : "text-secondary-600"} text-xs `}>{comment?.likes?.length}</p> :
                                <p className='text-xs text-secondary-600'>{comment?.likes?.length > 0 ? comment?.likes?.length : null}</p>}
                        </div>
                    </section>
                )
            } )}
        </section>
    )
}
