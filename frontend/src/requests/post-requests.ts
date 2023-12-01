import { api } from "@/libs/axios";
import { getCookie } from "@/libs/cookies-js";



export enum PostType {
    PUBLIC = "PUBLIC",
    COURSE = "COURSE",
}

export const postRequests = () => {

    const token = getCookie( "token" );


    const getPosts = async ( type?: PostType, page?: number ) => {
        const response = await api.get(
            '/post',
            {
                headers: { Authorization: `Bearer ${token}` },
                params: { type, page: page?.toString() }
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

    const toggleLike = async ( postId: string ): Promise<void> => {
        await api.post( `/post/${postId}/like`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        } );
    }

    const deletePost = async ( postId: string ): Promise<void> => {
        await api.patch(
            `/post/${postId}/delete`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` }
            } );
    }


    const deleteComment = async ( commentId: string ): Promise<void> => {
        await api.delete(
            `/post/${commentId}/comment/delete`,
            { headers: { Authorization: `Bearer ${token}` } } );

    }

    return {
        getPosts,
        createPost,
        createComment,
        toggleLike,
        deletePost,
        deleteComment
    }

}