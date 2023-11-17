import { makePostFactory } from "@/factories/post-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";



export const POST_CONTROLLER = async () => {

    const postFactory = makePostFactory()

    const posts = async ( req: FastifyRequest, res: FastifyReply ) => {

        const postSchema = z.object( {
            type: z.optional( z.enum( ['PUBLIC', 'COURSE'] ) )
        } )


        const { type } = postSchema.parse( req.query )
        const posts = await postFactory.posts( type )
        return res.status( 200 ).send( posts )

    }

    return {
        posts
    }

}
