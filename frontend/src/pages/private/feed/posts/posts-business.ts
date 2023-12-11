import { useUserContext } from "@/context/user-context"
import { queryClient } from "@/libs/react-query"
import { postRequests } from "@/requests/post-requests"
import { PostProps } from "@/types/post"
import { useInfiniteQuery, useMutation } from "react-query"
import React from 'react';
import { usePostContext } from "@/context/post-context"
import { useModalContext } from "@/context/modal-context"
import { GO_TO_LOGIN } from "@/router/navigators"
import { useNavigate } from "react-router-dom"




export const PostBusiness = () => {

    const req = postRequests()
    const navigate = useNavigate()
    const user = useUserContext()
    const { postType } = usePostContext()
    const { deletePost } = useModalContext()


    const {
        data,
        fetchNextPage,

    } = useInfiniteQuery( {
        queryKey: ["posts", postType],
        queryFn: ( { pageParam = 1 } ) => req.getPosts( postType, pageParam ),
        getNextPageParam: ( lastPage, allPages ) => {
            return allPages.length + 1
        },
        refetchOnWindowFocus: false,
        onError: () => {
            GO_TO_LOGIN( navigate )
        }
    } );

    const newPosts = data?.pages.flatMap( page => page )

    const postsWithIsAuthor = newPosts?.map<PostProps>( post => {
        return {
            ...post, is_author: post.author_id === user.data?.id,
            comments: post.comments.map( ( comment: any ) => {
                return { ...comment, is_author: comment.author_id === user.data?.id }
            } )
        }
    } );

    const { mutateAsync: toggleLikeMutation } = useMutation( {
        mutationFn: ( postId: string ) => req.toggleLike( postId ),
        onSuccess: () => {
            queryClient.invalidateQueries( ["posts"] )
        }
    } )

    const handleToggleLike = async ( postId: string ) => {
        await toggleLikeMutation( postId )
    }

    const menuRef = React.useRef<HTMLDivElement | null>( null );

    const { mutateAsync: deletePostMutation } = useMutation( {
        mutationFn: ( postId: string ) => req.deletePost( postId ),
        onSuccess: () => {
            queryClient.invalidateQueries( ["posts"] )
            deletePost.close()
        }
    } )

    const { mutateAsync: deleteCommentMutation } = useMutation( {
        mutationFn: ( commentId: string ) => req.deleteComment( commentId ),
        onSuccess: () => {
            queryClient.invalidateQueries( ["posts"] )
            deletePost.close()
        }

    } )


    return {
        posts: postsWithIsAuthor,
        handleToggleLike,
        menuRef,
        deletePostMutation,
        deleteCommentMutation,
        fetchNextPage
    }


}
