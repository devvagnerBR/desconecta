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

    const create = async ( req: FastifyRequest, res: FastifyReply ) => {

        const postSchema = z.object( {
            content: z.string( { required_error: "Conteúdo da postagem é obrigatório" } ),
            type: z.optional( z.enum( ['PUBLIC', 'COURSE'] ) )
        } )

        const { content, type } = postSchema.parse( req.body )
        const userId = req.user.sub

        await postFactory.create( content, userId, type, )

        return res.status( 201 ).send( { message: "Post criado com sucesso" } )

    }

    const createComment = async ( req: FastifyRequest, res: FastifyReply ) => {

        const createCommentBodySchema = z.object( {
            content: z.string( { required_error: "Conteúdo da postagem é obrigatório" } ),
        } )

        const createCommentParamsSchema = z.object( {
            postId: z.string( { required_error: "Id da postagem é obrigatório" } )

        } )

        const { content } = createCommentBodySchema.parse( req.body )
        const { postId } = createCommentParamsSchema.parse( req.params )

        const userId = req.user.sub

        await postFactory.createComment( content, postId, userId )

        return res.status( 201 ).send( { message: "Comentário criado com sucesso" } )
    }

    return {
        posts,
        create,
        createComment
    }

}
