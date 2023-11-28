import { momentJs } from '@/libs/moment-js'
import { PostProps } from '@/types/post'
import * as Icon from '@phosphor-icons/react'
import { PostBusiness } from '../posts-business'
import { useUserContext } from '@/context/user-context'
export const Comments = ( { post }: { post: PostProps } ) => {

    const comments = post?.comments

    const { handleToggleLike } = PostBusiness()
    const { data: user } = useUserContext()

    return (
        <section className='mt-2'>
            {comments?.map( ( comment ) => {

                const isLiked = user && comment.likes.includes( user?.id )
                return (
                    <section key={`${comment.author.id}+${comment.created_at}+${Math.random()}`} className=' p-2 border-t  flex flex-col items-start gap-2'>
                        <div className='flex gap-2 w-full'>
                            <img src={comment.author.avatar} alt="" className='w-6 h-6 rounded-full' />
                            <div className='flex flex-col w-full'>
                                <div className=' flex items-end gap-2  w-full'>
                                    <p className='text-secondary-800 text-base font-medium leading-3'>{comment.author.username}</p>
                                    <p className='order-2 text-xs font-light items-end leading-3 text-secondary-600'>
                                        {momentJs( comment.created_at ).fromNow()}
                                    </p>
                                </div>
                                <p className='text-secondary-800/70 font-light text-xs'>{comment.author.course.name}</p>
                            </div>
                            <div className='h-4 flex justify-center pr- cursor-pointer'>
                                <Icon.DotsThreeOutline weight='thin' size={24} className='fill-secondary-600' />
                            </div>
                        </div>
                        <main className='flex flex-wrap  w-full'>
                            <p style={{ wordBreak: 'break-all' }} className=' text-sm flex text-secondary-800  flex-wrap'>{comment.content}</p>
                        </main>


                        <div
                            onClick={() => handleToggleLike( comment.id )}
                            className='w-fit flex items-center gap-1 cursor-pointer'>
                            <Icon.ThumbsUp size={16} className={` ${isLiked ? "fill-primary-400" : "fill-secondary-600"}  transform scale-x-[-1]`} />
                            {isLiked ?
                                <p className={` ${isLiked ? "text-primary-400" : "text-secondary-600"} text-xs `}>{comment?.likes?.length}</p> :
                                <p className='text-xs text-secondary-600'>{comment?.likes?.length > 0 ? comment?.likes?.length : null }</p>}
                        </div>
                    </section>
                )
            } )}
        </section>
    )
}
