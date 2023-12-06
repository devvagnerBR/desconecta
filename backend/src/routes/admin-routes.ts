import { ADMIN_CONTROLLER, MulterRequest } from '@/controller/admin-controller';
import { File } from '@/entities/file';
import { verifyJWT } from '@/middlewares/verify-jwt';
import { FastifyInstance, FastifyRequest } from 'fastify';
import fastifyMulter from 'fastify-multer';




export const adminRoutes = async ( app: FastifyInstance ) => {

    app.addHook( 'onRequest', verifyJWT )

    const admin = await ADMIN_CONTROLLER();
    const upload = fastifyMulter( { storage: fastifyMulter.memoryStorage() } );
    app.register( fastifyMulter.contentParser );

    app.post( '/avatar/upload', { preHandler: upload.single( 'avatar' ) }, async ( request, reply ) => {
        const multerRequest = request as MulterRequest; // Cast the request to MulterRequest
        await admin.uploadAvatar( multerRequest, reply );
    } );

}