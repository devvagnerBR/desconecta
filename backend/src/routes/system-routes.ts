import { SYSTEM_CONTROLLER } from '@/controller/system-controller';
import { verifyJWT } from '@/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';

export const systemRoutes = async ( app: FastifyInstance ) => {

    app.addHook( 'preHandler', verifyJWT )

    const system = await SYSTEM_CONTROLLER();

    app.get( '/avatars',  system.getAllAvailableAvatars );

   

}