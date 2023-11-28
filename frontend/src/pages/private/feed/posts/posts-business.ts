import { useUserContext } from "@/context/user-context"
import { queryClient } from "@/libs/react-query"
import { PostType, postRequests } from "@/requests/post-requests"
import { PostProps } from "@/types/post"
import { useMutation, useQuery } from "react-query"
import React from 'react';
import { usePostContext } from "@/context/post-context"
import { useModalContext } from "@/context/modal-context"



export const PostBusiness = () => {

    const req = postRequests()
    const user = useUserContext()
    const { postType } = usePostContext()
    const { deletePost } = useModalContext()

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


    const { mutateAsync: toggleLikeMutation } = useMutation( {
        mutationFn: ( postId: string ) => req.toggleLike( postId ),
        onSuccess: () => {
            queryClient.invalidateQueries( ["posts"] )
        }
    } )

    const handleToggleLike = async ( postId: string ) => {
        await toggleLikeMutation( postId )
    }

    const [showOptionsMenu, setShowOptionsMenu] = React.useState( false )
    const menuRef = React.useRef<HTMLDivElement | null>( null );

    React.useEffect( () => {
        function handleClickOutside( event: MouseEvent ) {
            if ( menuRef.current && !menuRef.current.contains( event.target as Node ) ) {
                setShowOptionsMenu( false );
            }
        }

        document.addEventListener( "mousedown", handleClickOutside );
        return () => {
            document.removeEventListener( "mousedown", handleClickOutside );
        };
    }, [menuRef] );

    const {mutateAsync: deletePostMutation} = useMutation( {
        mutationFn: ( postId: string ) => req.deletePost( postId ),
        onSuccess: () => {
            queryClient.invalidateQueries( ["posts"] )
            deletePost.close()
        }
    } )





    return {
        posts: postsWithIsAuthor,
        handleToggleLike,
        showOptionsMenu,
        setShowOptionsMenu,
        menuRef,
        deletePostMutation
    }


}
