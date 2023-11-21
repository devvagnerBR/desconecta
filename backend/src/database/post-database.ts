import { PRISMA } from "@/libs/prisma";
import { Post, Prisma } from "@prisma/client";

export class POST_DATABASE {

    async posts( type: 'PUBLIC' | 'COURSE' = "PUBLIC" ) {

        const posts = await PRISMA.post.findMany( {
            where: { its_published: true, type },
            include: {
                author: {
                    select: {
                        id: true, username: true, email: true, avatar: true,
                        course: { select: { name: true } }
                    }
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true, username: true, email: true, avatar: true,

                            }
                        },
                        likes: { select: { user_id: true } }
                    }
                },
                likes: {
                    select: {
                        user_id: true,

                    }
                }
            },

        } )

        const postsWithLikesInArrayOfIds = posts.map( post => ( {
            ...post,
            comments: post.comments.map( comment => ( {
                ...comment,
                likes: comment.likes.map( like => like.user_id )
            } ) ),
            likes: post.likes.map( like => like.user_id )
        } ) )

        return postsWithLikesInArrayOfIds
    }

    async create( data: Prisma.PostCreateInput, userId: string ) {

        await PRISMA.post.create( {
            data: {
                content: data.content,
                type: data.type ?? undefined,
                author_id: userId,
            }
        } )
    }

    async createComment( data: Prisma.CommentCreateInput, postId: string, userId: string ) {
        await PRISMA.comment.create( {
            data: {
                content: data.content,
                post_id: postId,
                author_id: userId
            }
        } )
    }

    async getPostById( postId: string ) {
        const post = await PRISMA.post.findUnique( {
            where: { id: postId }
        } )

        return post
    }
}