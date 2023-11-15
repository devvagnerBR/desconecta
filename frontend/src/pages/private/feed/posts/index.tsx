import { CardPost } from "./card-post"
import { PostBusiness } from "./posts-business"

export const Posts = () => {


    const { posts } = PostBusiness()

    return (
        <div className="mt-2 flex flex-col gap-4 max-md:pb-24">
            {posts?.map( ( post ) => {
                return <CardPost
                    key={`${post.id}+${post.created_at}`}
                    post={post} />
            } )}
        </div>
    )
}
