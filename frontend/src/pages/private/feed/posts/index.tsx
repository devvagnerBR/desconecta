import { PostType } from "@/requests/post-requests"
import { CardPost } from "./card-post"
import { PostBusiness } from "./posts-business"
import { useUserContext } from "@/context/user-context"

interface StatePostType {
    postType: PostType
}

export const Posts = ( { postType }: StatePostType ) => {

    const user = useUserContext()
    const { posts } = PostBusiness( user.data?.id!, postType )

    return (
        <div className="mt-2 flex flex-col gap-4 max-md:pb-24">
            {posts?.map( ( post ) => {
                return <CardPost
                    key={`${post.id}+${post.created_at}`}
                    post={post}
                />
            } )}
        </div>
    )
}
