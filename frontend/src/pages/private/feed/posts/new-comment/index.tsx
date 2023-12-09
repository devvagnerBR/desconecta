
import { useUserContext } from '@/context/user-context'
import { newCommentBusiness } from './new-comment-business'

export const NewComment = ( { postId }: { postId: string } ) => {

    const { data: user } = useUserContext()
    const { handleChange, createComment, comment } = newCommentBusiness( postId )

    return (
        <section className='mt-2 flex items-center gap-2 pl-2 border rounded-3xl overflow-hidden'>
            <img src={user?.avatar} alt="" className='w-8 h-8 rounded-full' />
            <form
                onSubmit={( event ) => {
                    event.preventDefault();
                    createComment.mutate();
                }}
                className='flex w-full'>
                <input
                    onChange={handleChange}
                    value={comment || ''}
                    maxLength={600}
                    type="text"
                    className='text-primary-400 font-semibold w-full h-10   border-l-0 border-secondary-400 px-2'
                />
            </form>
        </section >
    )
}
