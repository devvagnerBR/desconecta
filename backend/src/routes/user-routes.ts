import { USER_CONTROLLER } from '@/controller/user-controller';
import { FastifyInstance } from 'fastify';

export const userRoutes = async ( app: FastifyInstance ) => {

    const user = await USER_CONTROLLER()

    app.post( '/user', user.create )

}