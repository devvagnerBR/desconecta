import React from "react";
import { PostType } from "@/requests/post-requests";


interface PostContextProps {
    postType: PostType,
    setPostType: React.Dispatch<React.SetStateAction<PostType>>
    postId: string | null,
    setPostId: React.Dispatch<React.SetStateAction<string | null>>
    commentId: string | null,
    setCommentId: React.Dispatch<React.SetStateAction<string | null>>

}

const PostContext = React.createContext<PostContextProps | null>( null )

const PostContextProvider = ( { children }: React.PropsWithChildren ) => {

    const [postType, setPostType] = React.useState<PostType>( PostType.PUBLIC )
    const [postId, setPostId] = React.useState<string | null>( "" )
    const [commentId, setCommentId] = React.useState<string | null>( "" )



    return (
        <PostContext.Provider value={{
            postType, setPostType, postId, setPostId, commentId, setCommentId

        }}>
            {children}
        </PostContext.Provider>
    )

}

const usePostContext = () => {

    const context = React.useContext( PostContext )
    if ( !context ) throw new Error( "UseData precisa estar dentro de um provider" );
    return context

}


export { PostContextProvider, usePostContext }