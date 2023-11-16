import { makeUserFactory } from "@/factories/user-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export const USER_CONTROLLER = async () => {

    const userFactory = makeUserFactory()

    const create = async ( req: FastifyRequest, res: FastifyReply ) => {

        const registerBodySchema = z.object( {
            username:
                z.string( { required_error: 'Username é obrigatório' } )
                    .min( 3, " Username deve ter no mínimo 3 caracteres" ),
            email:
                z.string( { required_error: "Email é obrigatório" } )
                    .email( "Email inválido" ),
            password:
                z.string( { required_error: "Senha é obrigatório" } )
                    .min( 6, "Senha deve ter no mínimo 6 caracteres" ),
            course_id:
                z.number( { required_error: "Id do curso é obrigatório" } )
                    .int( "Id do curso deve ser um número inteiro" )
        } );

        const registerBody = registerBodySchema.safeParse( req.body )
        if ( !registerBody.success ) return res.status( 400 ).send( registerBody.error.format() )

        await userFactory.create( registerBody.data )

        return res.status( 201 ).send( { message: "Usuário criado com sucesso" } )

    }

    const authenticate = async ( req: FastifyRequest, res: FastifyReply ) => {

        const registerBodySchema = z.object( {
            email:
                z.string( { required_error: "Email é obrigatório" } )
                    .email( "Email inválido" ),
            password:
                z.string( { required_error: "Senha é obrigatório" } )
                    .min( 6, "Senha deve ter no mínimo 6 caracteres" ),

        } );

        const registerBody = registerBodySchema.safeParse( req.body )
        if ( !registerBody.success ) return res.status( 400 ).send( registerBody.error.format() );

        const userId = await userFactory.authenticate( registerBody.data );
        const token = await res.jwtSign( { sub: userId } );
        const refreshToken = await res.jwtSign( { sub: userId }, { expiresIn: '7d' } );

        return res.setCookie( 'refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true
        } ).send( { token } )
    }


    const profile = async ( req: FastifyRequest, res: FastifyReply ) => {

        const userId = req.user.sub as string;

        const user = await userFactory.profile( userId )

        const userWithOutPassword = {
            ...user,
            password: undefined
        }

        return res.status( 200 ).send( userWithOutPassword )

    }

    return {
        create,
        authenticate,
        profile
    }

}
