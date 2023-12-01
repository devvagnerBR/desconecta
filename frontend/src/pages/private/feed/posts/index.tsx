import React from "react"
import { PostBusiness } from "./posts-business"
import { CardPost } from "./card-post/card-post"
import { PostProps } from "@/types/post"


export const Posts = () => {

    const { posts } = PostBusiness() as { posts: PostProps[] }

    return (
        <div className="mt-2 flex flex-col gap-2 max-md:pb-24">
            {posts?.map( ( post: PostProps ) => {
                return (
                    <CardPost
                        key={`${post.id}+${post.created_at}`}
                        post={post}
                    />
                )
            } )}
        </div>
    )
}
