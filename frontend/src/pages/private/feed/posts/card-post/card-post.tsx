
import { getPageWidth } from '@/utils/get-page-width'
import { textLimit } from '@/utils/text-limit'
import * as Icon from "@phosphor-icons/react"
import React from 'react'
import { NewComment } from '../new-comment'
import { Comments } from '../comments'
import { momentJs } from '@/libs/moment-js'
import { PostProps } from '@/types/post'
import { PostBusiness } from '../posts-business'
import { useUserContext } from '@/context/user-context'
import { ModalPostOptions } from '../modal-post-options'
import { Avatar } from '@/components'
import { useNavigate } from 'react-router-dom'
import { GO_TO_OTHER_USER_PROFILE } from '../../../../../router/navigators';

export interface CardPostProps {
    post: PostProps
}

export const CardPost = ( { post }: CardPostProps ) => {

    const author = post?.author
    const { data: user } = useUserContext()
    const { size } = getPageWidth()
    const navigate = useNavigate()

    const { handleToggleLike
    } = PostBusiness()

    const [showComentInput, setShowComentInput] = React.useState( false )
    const [showOptionsMenu, setShowOptionsMenu] = React.useState( false )

    const isLiked = user && post?.likes?.includes( user?.id )
    if ( !post ) return null
    return (
        <section className={`border bg-secondary-50 py-2 px-4 rounded-sm relative `}>

            <ModalPostOptions
                post={post}
                setShowOptionsMenu={setShowOptionsMenu}
                showOptionsMenu={showOptionsMenu} />

            <header className='flex h-12 items-center gap-2'>
                <div
                    onClick={() => GO_TO_OTHER_USER_PROFILE( navigate, author?.username )()}
                    className="w-full flex gap-4 h-full  items-center justify-start pr-2 cursor-pointer ">
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
                        onClick={() => setShowOptionsMenu( true )}
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
            {showComentInput && post?.comments?.length > 0 && <Comments post={post} />}

        </section>
    )
}
