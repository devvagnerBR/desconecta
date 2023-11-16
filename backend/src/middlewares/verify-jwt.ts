import { FastifyRequest, FastifyReply } from 'fastify';


export const verifyJWT = async ( req: FastifyRequest, res: FastifyReply ) => {

    try {
        await req.jwtVerify();
    } catch ( error ) {
        res.status( 401 )
            .send( { message: 'Não autorizado' } );
    }

}
