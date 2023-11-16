import { makeUserFactory } from "@/factories/user-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export const USER_CONTROLLER = async () => {

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

        const userFactory = makeUserFactory()
        await userFactory.create( registerBody.data )

        return res.status( 201 ).send( { message: "Usuário criado com sucesso" } )

    }


    return {
        create
    }


}