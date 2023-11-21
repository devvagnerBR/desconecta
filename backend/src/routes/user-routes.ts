import { USER_CONTROLLER } from '@/controller/user-controller';
import { verifyJWT } from '@/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';

export const userRoutes = async ( app: FastifyInstance ) => {

    const user = await USER_CONTROLLER()

    app.post( '/user', user.create )
    app.post( '/user/auth', user.authenticate )
    app.get( '/user', { onRequest: [verifyJWT] }, user.profile )
    app.patch( '/user/update', { onRequest: [verifyJWT] }, user.update )

}