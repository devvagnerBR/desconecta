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
        const userId = await userFactory.authenticate( { email: registerBody.data.email, password: registerBody.data.password } );

        const token = await res.jwtSign( { sub: userId } );
        const refreshToken = await res.jwtSign( { sub: userId }, { expiresIn: '7d' } );

        return res.setCookie( 'refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true
        } ).status( 201 ).send( { token } )

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

    const update = async ( req: FastifyRequest, res: FastifyReply ) => {

        const userId = req.user.sub as string;

        const registerBodySchema = z.object( {
            username:
                z.string( { required_error: 'Username é obrigatório' } )
                    .min( 3, " Username deve ter no mínimo 3 caracteres" ).optional(),
            email:
                z.string( { required_error: "Email é obrigatório" } )
                    .email( "Email inválido" ).optional(),
            password:
                z.string( { required_error: "Senha é obrigatório" } )
                    .min( 6, "Senha deve ter no mínimo 6 caracteres" ).optional(),
            avatar: z.string().optional(),
        } );

        const { avatar, email, username, password } = registerBodySchema.parse( req.body )
        if ( !avatar && !email && !username && !password ) return res.status( 400 ).send( { message: "Nenhum dado foi enviado" } )

        await userFactory.update( userId, { avatar, email, username, password } )

        return res.status( 200 ).send( { message: "Usuário atualizado com sucesso" } )

    }

    const sendCodeValidation = async ( req: FastifyRequest, res: FastifyReply ) => {
        const userId = req.user.sub as string;
        await userFactory.sendCodeValidation( userId )
        return res.status( 200 ).send( { message: "Código enviado com sucesso" } )
    }

    const validateAccount = async ( req: FastifyRequest, res: FastifyReply ) => {

        const validateCodeSchema = z.object( {
            code: z.string( { required_error: "Código é obrigatório" } )
                .min( 6, "Código deve ter 6 caracteres" )
                .max( 6, "Código deve ter 6 caracteres" )
        } )

        const userId = req.user.sub as string;
        const { code } = validateCodeSchema.parse( req.body )

        await userFactory.validateAccount( userId, code )
        return res.status( 200 ).send( { message: "Conta validada com sucesso" } )
    }

    return {
        create,
        authenticate,
        profile,
        update,
        sendCodeValidation,
        validateAccount
    }

}
