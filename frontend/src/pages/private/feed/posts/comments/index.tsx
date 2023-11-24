import { momentJs } from '@/libs/moment-js'
import { PostProps } from '@/types/post'
import * as Icon from '@phosphor-icons/react'
export const Comments = ( { post }: { post: PostProps } ) => {

    const comments = post?.comments


    return (
        <section>
            {comments?.map( ( comment ) => {
                return (
                    <section key={`${comment.author.id}+${comment.created_at}+${Math.random()}`} className=' mt-1 p-2 border rounded-md  flex flex-col items-start gap-2'>
                        <div className='flex gap-2 w-full'>
                            <img src={comment.author.avatar} alt="" className='w-8 h-8 rounded-full' />
                            <div className='flex flex-col w-full'>
                                <div className=' flex items-end gap-2  w-full'>
                                    <p className='text-secondary-800 text-lg font-medium leading-5'>{comment.author.username}</p>
                                    <p className='order-2 text-sm items-end leading-4 text-secondary-600'>
                                        {momentJs( comment.created_at ).fromNow()}
                                    </p>
                                </div>
                                <p className='text-secondary-800/70 font-light text-xs'>{comment.author.course.name}</p>
                            </div>
                            <div className='h-8 flex justify-center pr-2 cursor-pointer'>
                                <Icon.DotsThreeOutline weight='thin' size={24} className='fill-secondary-600' />
                            </div>
                        </div>
                        <main className='flex flex-wrap   p-2 rounded-md border border-primary-400'>
                            <p style={{ wordBreak: 'break-all' }} className=' flex text-primary-400  flex-wrap'>{comment.content}</p>
                        </main>
                        <div className='w-full flex items-center gap-2 cursor-pointer'>
                            <Icon.ThumbsUp className=' fill-secondary-600 transform scale-x-[-1]' />
                            <p className='text-sm text-secondary-600'>gostei</p>
                        </div>
                    </section>
                )
            } )}
        </section>
    )
}
