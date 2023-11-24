import { useModalContext } from "@/context/modal-context"
import { PostType } from "@/requests/post-requests"

interface StatePostType {
    setPostType: ( postType: PostType ) => void
}

export const NewPostInput = ( { setPostType }: StatePostType ) => {

    const { newPost } = useModalContext()

    return (
        <div
            className='flex flex-col items-center justify-center'>
            <div
                onClick={newPost.open}
                className='flex items-center w-full cursor-pointer'>
                <div className="w-full bg-secondary-50 h-10 border flex items-center rounded-sm rounded-r-none pl-2">
                    <p className="font-light text-secondary-600">Compartilhe algo novo ...</p>
                </div>
                <button
                    type="reset"
                    className='w-24 bg-primary-400 rounded-sm h-10 border rounded-l-none border-primary-400 text-secondary-50 font-semibold text-lg'>
                    Postar
                </button>
            </div>

            <div className=" h-6 flex gap-2 items-center w-full">
                <div className="border-b h-2 w-full " />
                <div className="shrink-0 items-start h-3 gap-2 flex">
                    <p className="shrink-0 text-xs">Classificar por:</p>
                    <select
                        onChange={( event ) => setPostType( event.target.value as PostType )}
                        defaultValue="PUBLIC" className="shrink-0  bg-secondary-200border shadow-sm  text-secondary-800 font-light text-xs">
                        <option value={PostType.PUBLIC}>Global</option>
                        <option value={PostType.COURSE}>Curso</option>
                    </select>
                </div>
            </div>
        </div >
    )
}
