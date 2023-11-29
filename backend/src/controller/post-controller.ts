import { makePostFactory } from "@/factories/post-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const POST_CONTROLLER = async () => {

    const postFactory = makePostFactory()

    const getPosts = async ( req: FastifyRequest, res: FastifyReply ) => {

        const postSchema = z.object( {
            type: z.optional( z.enum( ['PUBLIC', 'COURSE'] ) )
        } )


        const { type } = postSchema.parse( req.query )
        const posts = await postFactory.getPosts( type )

        return res.status( 200 ).send( posts )

    }

    const createPost = async ( req: FastifyRequest, res: FastifyReply ) => {

        const postSchema = z.object( {
            content: z.string( { required_error: "Conteúdo da postagem é obrigatório" } ),
            type: z.optional( z.enum( ['PUBLIC', 'COURSE'] ) )
        } )

        const { content, type } = postSchema.parse( req.body )
        const userId = req.user.sub

        await postFactory.createPost( content, userId, type, )

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

    const toggleLike = async ( req: FastifyRequest, res: FastifyReply ) => {

        const toggleLikeParamsSchema = z.object( {
            itemId: z.string( { required_error: "Id da postagem é obrigatório" } )
        } )

        const { itemId } = toggleLikeParamsSchema.parse( req.params )
        const userId = req.user.sub

        await postFactory.toggleLike( userId, itemId )

        return res.status( 200 ).send( { message: "Like atualizado com sucesso" } )

    }

    const markPostAsDeleted = async ( req: FastifyRequest, res: FastifyReply ) => {

        const markPostAsDeletedParamsSchema = z.object( {
            postId: z.string( { required_error: "Id da postagem é obrigatório" } )
        } )

        const { postId } = markPostAsDeletedParamsSchema.parse( req.params )
        await postFactory.markPostAsDeleted( postId )
        return res.status( 200 ).send( { message: "Post deletado com sucesso" } )
    }

    const deleteComment = async ( req: FastifyRequest, res: FastifyReply ) => {

        const deleteCommentParamsSchema = z.object( {
            commentId: z.string( { required_error: "Id do comentário é obrigatório" } )
        } )

        const { commentId } = deleteCommentParamsSchema.parse( req.params )
        const userId = req.user.sub

        await postFactory.deleteComment( commentId, userId )
        return res.status( 200 ).send( { message: "Comentário deletado com sucesso" } )
    }

    return {
        getPosts,
        createPost,
        createComment,
        toggleLike,
        markPostAsDeleted,
        deleteComment,

    }
}
