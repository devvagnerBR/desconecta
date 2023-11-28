
import { Avatar } from '@/components'
import { getPageWidth } from '@/utils/get-page-width'
import { textLimit } from '@/utils/text-limit'
import * as Icon from "@phosphor-icons/react"
import React from 'react'
import { NewComment } from './new-comment'
import { Comments } from './comments'
import { momentJs } from '@/libs/moment-js'
import { PostProps } from '@/types/post'
import { PostBusiness } from './posts-business'
import { useUserContext } from '@/context/user-context'
import { useModalContext } from '@/context/modal-context'
import { usePostContext } from '@/context/post-context'

export interface CardPostProps {
    post: PostProps
}

export const CardPost = ( { post }: CardPostProps ) => {

    const author = post?.author
    const { deletePost } = useModalContext()
    const { data: user } = useUserContext()
    const { size } = getPageWidth()

    const { handleToggleLike,
        showOptionsMenu,
        setShowOptionsMenu,
        menuRef,
    } = PostBusiness()

    const { setPostId } = usePostContext()

    const [showComentInput, setShowComentInput] = React.useState( false )
    const isLiked = user && post.likes.includes( user?.id )

    return (
        <section className={`border bg-secondary-50 py-2 px-4 rounded-sm relative `}>

            {showOptionsMenu &&
                <div
                    onClick={() => setPostId( post.id )}
                    ref={menuRef}
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
            }
            <header className='flex h-12 items-center gap-2'>
                <div className="w-full flex gap-4 h-full items-center justify-start pr-2">
                    <div className="flex flex-col order-1  gap-1 shrink-0 no_click">
                        <div className='flex items-end gap-2'>
                            <p className="text-start text-lg leading-none">{author?.username}</p>
                            <p className='order-2 text-xs font-light items-end leading-4 text-secondary-600'>
                                {momentJs( post?.created_at ).fromNow()}</p>
                        </div>

                        <p className="text-secondary-600 text-sm leading-none shrink-0 max-sm:text-xs">
                            {textLimit( author?.course.name, size / 12 )}
                        </p>
                    </div>
                    <Avatar data={author} />
                </div>

                <section className='h-full cursor-pointer'>
                    <Icon.DotsThree
                        onClick={() => setShowOptionsMenu( !showOptionsMenu )}
                        size={28} weight='bold' />
                </section>
            </header>
            <section className='mt-4 '>
                <p className='text-sm'>{post.content}</p>
            </section>
            <section className='mt-2 flex  gap-4'>
                <p className='text-secondary-600 font-light text-sm cursor-pointer'>{post?.likes.length} curtidas</p>
                <p
                    onClick={() => setShowComentInput( true )}
                    className='text-secondary-600 font-light text-sm cursor-pointer'>
                    {post?.comments.length} comentarios
                </p>
            </section>
            <nav className='flex items-center max-sm:gap-16 gap-2 h-full mt-2 border-t pt-2'>

                <div
                    onClick={() => handleToggleLike( post.id )}
                    className='flex items-start gap-2 cursor-pointer rounded-md py-1'>
                    <Icon.ThumbsUp size={18} className={`${isLiked ? "fill-primary-400" : "fill-secondary-600"}  max-sm:w-6 max-sm:h-6 transform scale-x-[-1]`} />
                    {!isLiked ?
                        <p className='text-secondary-600 text-sm max-sm:hidden'>Curtir</p> :
                        <p className={` text-primary-400 text-sm max-sm:hidden`}>Curtido</p>}
                </div>
                <div
                    onClick={() => setShowComentInput( true )}
                    className='flex items-center gap-2 cursor-pointer rounded-md px-2 py-1 '>
                    <Icon.ChatDots size={20} className='fill-secondary-600 max-sm:w-6 max-sm:h-6' />
                    <p className='text-secondary-600 text-sm max-sm:hidden max-sm:w-28'>Comentar</p>
                </div>
                <div className='flex items-center gap-2 cursor-pointer rounded-md px-2 py-1 '>
                    <Icon.BookmarkSimple size={20} className='fill-secondary-600 max-sm:w-6 max-sm:h-6' />
                    <p className='text-secondary-600 text-sm max-sm:hidden max-sm:w-28'>Salvar</p>
                </div>
            </nav>

            {showComentInput && < NewComment postId={post.id} />}
            {showComentInput && post.comments.length > 0 && <Comments post={post} />}

        </section>
    )
}
