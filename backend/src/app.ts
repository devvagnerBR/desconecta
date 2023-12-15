import { env } from "@/env";
import fastify from "fastify";
import { ZodError } from "zod";
import cors from '@fastify/cors'
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { userRoutes } from "./routes/user-routes";
import { postRoutes } from "./routes/post-routes";
import { adminRoutes } from "./routes/admin-routes";
import { systemRoutes } from "./routes/system-routes";
import { CustomError } from "./entities/custom-error";
import { courseRoutes } from "./routes/course-routes";

export const app = fastify();


app.register( cors, {
    origin: 'http://localhost:5173',
    credentials: true
} );


app.register( fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refresh_token',
        signed: false
    },
    sign: {
        expiresIn: env.JWT_EXPIRES_IN
    }

} )

app.register( fastifyCookie );
app.register( userRoutes );
app.register( postRoutes );
app.register( adminRoutes );
app.register( systemRoutes );
app.register( courseRoutes );

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