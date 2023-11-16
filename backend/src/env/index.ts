import { z } from "zod";
import 'dotenv/config'

const envSchema = z.object( {
    NODE_ENV: z.enum( ['dev', 'test', 'production'] ).default( 'dev' ),
    PORT: z.coerce.number().default( 3333 ),
    JWT_EXPIRES_IN: z.string(),
    JWT_SECRET: z.string(),
    BCRYPT_SALT: z.coerce.number().min( 6 ).max( 12 )
} )

const _env = envSchema.safeParse( process.env )

if ( !_env.success ) {
    console.log( '❌ Invalid environment variables', _env.error.format() )
    throw new Error( 'Invalid environment variables' )
}
export const env = _env.data
