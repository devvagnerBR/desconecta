import { PostType } from "@/requests/post-requests";

export interface PostProps {

    id: string;
    content: string;
    created_at: string;
    author_id: string;
    its_published: boolean;
    type: PostType

    author: {
        avatar: string;
        username: string;
        id: string;
        email: string;
        course: { name: string }
    }
    comments: {
        author_id: string;
        content: string;
        created_at: string;
        id: string;
        post_id: string;
        likes: string[];
        is_author: boolean;
        author: {
            avatar: string;
            username: string;
            id: string;
            email: string;
            course: { name: string }
        }
    }[]

    likes: any[]
}
