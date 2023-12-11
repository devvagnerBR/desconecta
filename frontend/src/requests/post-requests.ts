import { api } from "@/libs/axios";

export enum PostType {
    PUBLIC = "PUBLIC",
    COURSE = "COURSE",
}

export const postRequests = () => {

    const getPosts = async ( type?: PostType, page?: number ) => {

      
            const response = await api.get(
                '/post',
                {
                    params: { type, page: page?.toString() }
                } );

            return response.data;
     

    }

    const createPost = async ( content: string, type: PostType ): Promise<void> => {
        await api.post( '/post', { content, type } );
    }

    const createComment = async ( postId: string, content: string ): Promise<void> => {
        await api.post( `/post/${postId}/comment`, { content } );
    }

    const toggleLike = async ( postId: string ): Promise<void> => {
        await api.post( `/post/${postId}/like` );
    }

    const deletePost = async ( postId: string ): Promise<void> => {
        await api.patch(
            `/post/${postId}/delete` );
    }


    const deleteComment = async ( commentId: string ): Promise<void> => {
        await api.delete(
            `/post/${commentId}/comment/delete` );
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