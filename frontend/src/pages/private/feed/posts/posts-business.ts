import { PostType, postRequests } from "@/requests/post-requests"
import { PostProps } from "@/types/post"
import { useQuery } from "react-query"



export const PostBusiness = ( userId: string, type?: PostType ) => {

    const req = postRequests()

    const { data: posts } = useQuery<PostProps[]>( {
        queryKey: ["posts", type],
        queryFn: () => req.getPosts( type ),
        refetchOnWindowFocus: false,
    } )


    const postsWithIsAuthor = posts?.map( post => {
        return {
            ...post, is_author: post.author_id === userId,
            comments: post.comments.map( comment => {
                return { ...comment, is_author: comment.author_id === userId }
            } )
        }
    } )

    return { posts: postsWithIsAuthor }

}
