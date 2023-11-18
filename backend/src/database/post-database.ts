import { PRISMA } from "@/libs/prisma";
import { Post, Prisma } from "@prisma/client";

export class POST_DATABASE {

    async posts( type: 'PUBLIC' | 'COURSE' = "PUBLIC" ): Promise<Post[] | null> {

        const posts = await PRISMA.post.findMany( {
            where: {
                type
            },

            orderBy: { created_at: 'desc' },
            include: {
                author: {
                    select: { avatar: true, username: true, email: true, id: true }
                },
                comments: {
                    select: {
                        author_id: true,
                        id: true,
                        content: true,
                        created_at: true,
                        answers: true,
                        user: { select: { username: true, avatar: true } }
                    }

                },
                likes: { select: { user_id: true } }
            }
        } )

        return posts
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

    async createAnswer( data: Prisma.AnswerCreateInput, commentId: string, userId: string ) {

        await PRISMA.answer.create( {
            data: {
                content: data.content,
                comment_id: commentId,
                author_id: userId
            }
        } )
    }

    async getCommentById( commentId: string ) {

        const comment = await PRISMA.comment.findUnique( {
            where: { id: commentId }
        } )

        return comment
    }

    async getPostById( postId: string ) {
        const post = await PRISMA.post.findUnique( {
            where: { id: postId }
        } )

        return post
    }
}