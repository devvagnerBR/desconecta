import { CustomError } from '@/entities/custom-error';
import { POST_DATABASE } from '@/database/post-database';

export class POST_BUSINESS {

    constructor(
        private postDatabase: POST_DATABASE
    ) { }

    async getPosts( type?: 'PUBLIC' | 'COURSE' ) {
        const posts = await this.postDatabase.getPosts( type )
        if ( !Array.isArray( posts ) ) throw new CustomError( 404, "posts não encontrados" )
        return posts
    }

    async createPost( content: string, userId: string, type?: "PUBLIC" | "COURSE", ) {
        await this.postDatabase.createPost( { content, type }, userId )
    }

    async createComment( content: string, postId: string, userId: string ) {
        await this.postDatabase.createComment( { content }, postId, userId )
    }

    async toggleLike( userId: string, itemId: string ) {
        await this.postDatabase.toggleLike( userId, itemId )
    }

    async markPostAsDeleted( postId: string,  ) {

        const post = await this.postDatabase.getPostById( postId )
        if ( !post ) throw new CustomError( 404, "Post não encontrado" )

        await this.postDatabase.markPostAsDeleted( postId )
    }

    async deleteComment( commentId: string, userId: string ) {

        const comment = await this.postDatabase.getCommentById( commentId )
        if ( !comment ) throw new CustomError( 404, "Comentário não encontrado" )

        //vericar se o user é o autor do post ou do comentário

        const post = await this.postDatabase.getPostById( comment.post_id )
        if ( !post ) throw new CustomError( 404, "Post não encontrado" )

        // if ( post.author_id !== userId ) throw new CustomError( 401, "Você não tem permissão para deletar este comentário" )
        if ( comment.author_id !== userId ) throw new CustomError( 401, "Você não tem permissão para deletar este comentário" )

        await this.postDatabase.deleteComment( commentId )

    }

}