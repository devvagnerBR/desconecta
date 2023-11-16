import fastifyCookie from "@fastify/cookie";
import fastify from "fastify";
import { env } from "@/env";
import fastifyJwt from "@fastify/jwt";
import { userRoutes } from "./routes/user-routes";

export const app = fastify();

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