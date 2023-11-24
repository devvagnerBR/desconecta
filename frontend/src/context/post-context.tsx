import React from "react";
import { getCookie } from "@/libs/cookies-js";
import { userRequests } from "@/requests";
import { useQuery } from "react-query";
import { User } from "@/types/user";
import { PostType } from "@/requests/post-requests";


interface PostContextProps {
    postType: PostType,
    setPostType: React.Dispatch<React.SetStateAction<PostType>>
}

const PostContext = React.createContext<PostContextProps | null>( null )

const PostContextProvider = ( { children }: React.PropsWithChildren ) => {

    const [postType, setPostType] = React.useState<PostType>( PostType.PUBLIC )



    return (
        <PostContext.Provider value={{ postType, setPostType }}>
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