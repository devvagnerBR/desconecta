import { api } from "@/libs/axios";
import { getCookie, removeCookie, setCookie } from "@/libs/cookies-js";
import { queryClient } from "@/libs/react-query";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";


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

    const createComment = async ( postId: string, content: string ): Promise<void> => {
        await api.post( `/post/${postId}/comment`, { content }, {
            headers: { Authorization: `Bearer ${token}` }
        } );
    }

    return {
        getPosts,
        createComment
    }

}