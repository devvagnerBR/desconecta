import { PRISMA } from "@/database/prisma";
import { Prisma } from "@prisma/client";

export class POST_DATABASE {

    async getPosts( type: 'PUBLIC' | 'COURSE' = "PUBLIC", CurrentPage: number = 1 ) {


        const posts = await PRISMA.post.findMany( {
            where: { its_published: true, type },
            orderBy: { created_at: 'desc' },
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
                                course: { select: { name: true } }

                            }
                        },
                        likes: { select: { user_id: true } },
                    }
                },
                likes: {
                    select: {
                        user_id: true,
                    }
                }
            },

            take: 5,
            skip: ( CurrentPage - 1 ) * 5 // 

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

    async createPost( data: Prisma.PostCreateInput, userId: string ) {

        await PRISMA.post.create( {
            data: {
                content: data.content,
                type: data.type ?? undefined,
                author_id: userId,
                its_published: true
            }
        } )
    }

    async markPostAsDeleted( postId: string ) {
        await PRISMA.post.update( {
            where: {
                id: postId
            }, data: { its_published: false }
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

    async deleteComment( commentId: string ) {
        await PRISMA.comment.delete( { where: { id: commentId } } )
    }

    async toggleLike( userId: string, itemId: string ) {

        const ItsComment = await PRISMA.comment.findUnique( {
            where: { id: itemId }
        } )

        if ( ItsComment ) {
            const alreadyMarkedAsLiked = await PRISMA.likes.findFirst( {
                where: {
                    comment_id: itemId,
                    user_id: userId
                }
            } )

            if ( alreadyMarkedAsLiked ) {
                await PRISMA.likes.delete( {
                    where: {
                        id: alreadyMarkedAsLiked.id
                    }
                } )
                return
            }

            await PRISMA.likes.create( {
                data: {
                    comment_id: itemId,
                    user_id: userId
                }
            } )
            return
        } else {
            const alreadyMarkedAsLiked = await PRISMA.likes.findFirst( {
                where: {
                    post_id: itemId,
                    user_id: userId
                }
            } )

            if ( alreadyMarkedAsLiked ) {
                await PRISMA.likes.delete( {
                    where: {
                        id: alreadyMarkedAsLiked.id
                    }
                } )
                return
            }

            await PRISMA.likes.create( {
                data: {
                    post_id: itemId,
                    user_id: userId
                }
            } )
            return

        }
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