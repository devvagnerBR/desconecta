
import { Avatar } from '@/components'
import { getPageWidth } from '@/utils/get-page-width'
import { textLimit } from '@/utils/text-limit'
import * as Icon from "@phosphor-icons/react"
import React from 'react'
import { NewComment } from './new-comment'
import { Comments } from './comments'
import { momentJs } from '@/libs/moment-js'
import { PostProps } from '@/types/post'

export interface CardPostProps {
    post: PostProps
}

export const CardPost = ( { post }: CardPostProps ) => {

    const author = post?.author
    const comments = post?.comments
    const likes = post?.likes
    const { size } = getPageWidth()

    const [showComentInput, setShowComentInput] = React.useState( false )

    return (
        <section className='border bg-secondary-50 p-4 rounded-sm'>
            <header className='flex h-12 items-center gap-2'>
                <div className="w-full flex gap-4 h-full items-center justify-start pr-2">
                    <div className="flex flex-col order-1  gap-1 shrink-0 no_click">
                        <div className='flex items-end gap-2'>
                            <p className="text-start text-lg leading-none">{author?.username}</p>
                            <p className='order-2 text-sm items-end leading-4 text-secondary-600'>
                                {momentJs( post?.created_at ).fromNow()}</p>
                        </div>

                        <p className="text-primary-400 text-sm leading-none shrink-0 max-sm:text-xs">
                            {textLimit( author?.course.name, size / 12 )}
                        </p>
                    </div>
                    <Avatar data={author} />
                </div>

                <section className='h-full cursor-pointer'>
                    <Icon.DotsThree size={28} weight='bold' />
                </section>
            </header>
            <section className='mt-4 '>
                <p>{post.content}</p>
            </section>
            <section className='mt-2 flex  gap-4'>
                <p className='text-secondary-600 font-light text-sm hover:text-blue-600 cursor-pointer'>{post?.likes.length} curtidas</p>
                <p
                    onClick={() => setShowComentInput( true )}
                    className='text-secondary-600 font-light text-sm cursor-pointer hover:text-blue-600'>
                    {post?.comments.length} comentarios
                </p>
            </section>
            <nav className='flex items-center max-sm:gap-16 gap-8 h-full mt-2 border-t pt-4'>
                <div className='flex items-center gap-2 cursor-pointer rounded-md  px-2 py-1'>
                    <Icon.ThumbsUp size={24} className='fill-secondary-600 max-sm:w-6 max-sm:h-6 transform scale-x-[-1]' />
                    <p className='text-secondary-600 max-sm:hidden'>Gostei</p>
                </div>
                <div
                    onClick={() => setShowComentInput( true )}
                    className='flex items-center gap-2 cursor-pointer rounded-md px-2 py-1 '>
                    <Icon.ChatDots size={24} className='fill-secondary-600 max-sm:w-6 max-sm:h-6' />
                    <p className='text-secondary-600 max-sm:hidden max-sm:w-28'>Comentar</p>
                </div>
                <div className='flex items-center gap-2 cursor-pointer rounded-md px-2 py-1 '>
                    <Icon.BookmarkSimple size={24} className='fill-secondary-600 max-sm:w-6 max-sm:h-6' />
                    <p className='text-secondary-600 max-sm:hidden max-sm:w-28'>Salvar</p>
                </div>
            </nav>

            {showComentInput && < NewComment postId={post.id} />}
            {showComentInput && post.comments.length > 0 && <Comments post={post} />}


        </section>
    )
}
