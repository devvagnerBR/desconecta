import { POST_CONTROLLER } from '@/controller/post-controller';

import { verifyJWT } from '@/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';

export const postRoutes = async ( app: FastifyInstance ) => {

    const post = await POST_CONTROLLER()
    app.addHook( 'onRequest', verifyJWT )

    app.get( '/post', post.posts )
    app.post( '/post', post.create )
    app.post( '/post/comment', post.createComment )


}