import fastifyCookie from "@fastify/cookie";
import fastify from "fastify";
import { env } from "@/env";
import fastifyJwt from "@fastify/jwt";
import { userRoutes } from "./routes/user-routes";
import { ZodError } from "zod";
import { CustomError } from "./entities/custom-error";
import cors from '@fastify/cors'

export const app =  fastify();


app.register( cors, {
    origin: '*',
} );


app.register( fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: env.JWT_EXPIRES_IN
    }

} )

app.register( fastifyCookie );
app.register( userRoutes );

app.setErrorHandler( ( error, _, res ) => {

    if ( error instanceof ZodError ) {

        return res
            .status( 400 )
            .send( { message: error.format() } );
    } else if ( error instanceof CustomError ) {
        res.status( error.statusCode ).send( {
            statusCode: error.statusCode,
            message: error.message
        } );
    } else {

    }

    return res.status( 500 ).send( { message: error.message } );
} )