import { api } from "@/libs/axios";
import { getCookie } from "@/libs/cookies-js";



export enum PostType {
    PUBLIC = "PUBLIC",
    COURSE = "COURSE",
}

export const postRequests = () => {

    const token = getCookie( "token" );

    const getPosts = async ( type?: PostType ) => {
        const response = await api.get(
            '/post',
            {
                headers: { Authorization: `Bearer ${token}` },
                params: { type }
            } );

        return response.data;
    }

    const createPost = async ( content: string, type: PostType ): Promise<void> => {
        await api.post( '/post', { content, type }, {
            headers: { Authorization: `Bearer ${token}` }
        } );
    }

    const createComment = async ( postId: string, content: string ): Promise<void> => {
        await api.post( `/post/${postId}/comment`, { content }, {
            headers: { Authorization: `Bearer ${token}` }
        } );
    }

    return {
        getPosts,
        createPost,
        createComment
    }

}