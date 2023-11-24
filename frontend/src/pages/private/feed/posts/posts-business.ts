import { useUserContext } from "@/context/user-context"
import { queryClient } from "@/libs/react-query"
import { PostType, postRequests } from "@/requests/post-requests"
import { PostProps } from "@/types/post"
import { useMutation, useQuery } from "react-query"
import React from 'react';
import { usePostContext } from "@/context/post-context"



export const PostBusiness = () => {

    const req = postRequests()
    const user = useUserContext()
    const { postType } = usePostContext()

    const { data: posts } = useQuery<PostProps[]>( {
        queryKey: ["posts", postType],
        queryFn: () => req.getPosts( postType ),
        refetchOnWindowFocus: false,
    } )

    const postsWithIsAuthor = posts?.map( post => {
        return {
            ...post, is_author: post.author_id === user.data?.id,
            comments: post.comments.map( comment => {
                return { ...comment, is_author: comment.author_id === user.data?.id }
            } )
        }
    } )


    const { mutateAsync } = useMutation( {
        mutationFn: ( postId: string ) => req.toggleLike( postId ),
        onSuccess: () => {
            queryClient.invalidateQueries( ["posts"] )
        }
    } )

    const handleToggleLike = async ( postId: string ) => {
        await mutateAsync( postId )
    }


    return {
        posts: postsWithIsAuthor,
        handleToggleLike,

    }


}
