import { useModalContext } from '@/context/modal-context'
import { usePostContext } from '@/context/post-context'
import { PostBusiness } from '../../posts-business'
import { useToasts } from '@/hooks/use-toasts'


export const DeleteCommentModal = () => {

    const { commentId } = usePostContext()
    const { deleteComment } = useModalContext()
    const { deleteCommentMutation } = PostBusiness()
    const { deleteCommentNotify } = useToasts()
    return (
        <div className='w-96 max-md:mt-4 max-md:w-full max-md:m-2 max-md:h-fit flex flex-col items-center justify-start py-4  px-2 h-44 border bg-secondary-50 rounded-sm'>
            <h1 className='text-xl font-semibold'>Você quer excluir esse comentario?</h1>
            <h2 className='text-center text-sm leading-4 mt-2 text-secondary-600'>Você tem certeza que quer excluir esse comentario permanentemente?</h2>
            <div className='mt-4 gap-4 flex items-center justify-center  pt-4 w-full border-t'>
                <button
                    onClick={() => deleteComment.close()}
                    className='border border-secondary-800 text-secondary-800 font-semibold p-3 rounded-sm hover:shadow-sm'>Cancelar</button>
                <button
                    onClick={async () => {

                        deleteComment.close()
                        await deleteCommentNotify()
                        deleteCommentMutation( commentId! )
                    }}
                    className='border p-3 rounded-sm hover:shadow-sm bg-primary-400 border-primary-400 text-secondary-50 font-medium'>Excluir</button>
            </div>
        </div >
    )
}
