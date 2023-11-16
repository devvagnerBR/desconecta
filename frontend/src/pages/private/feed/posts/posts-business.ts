import { User } from "@/context/user-context"
import { userRequests } from "@/requests"
import { useQuery } from "react-query"

export interface PostProps {

    id: string,
    content: string,
    author: User,
    likes: string[],
    created_at: string,
    comments: [
        {
            author: User,
            content: string,
            created_at: string,
            id: string
        }
    ],
}
export const PostBusiness = () => {


    const req = userRequests()

    const { data: posts } = useQuery<PostProps[]>( ['posts'], req.getPosts, {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10, // 10 minutes,
        cacheTime: 1000 * 60 * 10, // 10 minutes,
    } )
    return { posts }

}