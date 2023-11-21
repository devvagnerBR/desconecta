import { POST_CONTROLLER } from '@/controller/post-controller';

import { verifyJWT } from '@/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';

export const postRoutes = async ( app: FastifyInstance ) => {

    const post = await POST_CONTROLLER()
    app.addHook( 'onRequest', verifyJWT )

    //post
    app.get( '/post', post.getPosts )
    app.post( '/post', post.createPost )
    app.post( '/post/:itemId/like', post.toggleLike )
    app.patch( '/post/:postId/delete', post.markPostAsDeleted )

    //comment
    app.post( '/post/:postId/comment', post.createComment )
    app.delete( '/post/:commentId/comment/delete', post.deleteComment )



}