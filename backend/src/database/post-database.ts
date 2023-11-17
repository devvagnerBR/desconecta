import { PRISMA } from "@/libs/prisma";
import { Post } from "@prisma/client";

export class POST_DATABASE {

    async posts( type: 'PUBLIC' | 'COURSE' = "PUBLIC" ): Promise<Post[] | null> {

        const posts = await PRISMA.post.findMany( {
            where: {
                type
            },
            orderBy: { created_at: 'desc' },
            include: {
                user: {
                    select: { avatar: true, username: true, email: true, id: true }
                },
                comments: {
                    select: {
                        author_id: true,
                        id: true,
                        content: true,
                        created_at: true,
                        user: { select: { username: true, avatar: true } }
                    }

                },
                likes: { select: { user_id: true } },
            }
        } )

        const users_liked_id = posts.map( post => post.likes.map( like => like.user_id ) )
        return posts.map( post => ( {
            ...post,
            likes: users_liked_id.flat( 2 )
        } ) )
    }
}