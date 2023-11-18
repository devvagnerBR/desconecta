import { Post } from '@prisma/client';
import { CustomError } from '@/entities/custom-error';
import { POST_DATABASE } from '@/database/post-database';


export class POST_BUSINESS {

    constructor(
        private postDatabase: POST_DATABASE
    ) { }

    async posts( type?: 'PUBLIC' | 'COURSE' ): Promise<Post[] | null> {
        const posts = await this.postDatabase.posts( type )
        if ( !Array.isArray( posts ) ) throw new CustomError( 404, "posts não encontrados" )
        return posts
    }

    async create( content: string, userId: string, type?: "PUBLIC" | "COURSE", ) {
        await this.postDatabase.create( { content, type }, userId )
    }

    async createComment( content: string, postId: string, userId: string ) {

        const postExist = await this.postDatabase.getPostById( postId )
        if ( !postExist ) throw new CustomError( 404, "Post não encontrado" )

        await this.postDatabase.createComment( { content }, postId, userId )
    }

    async createAnswer( content: string, commentId: string, userId: string ) {

        const postExist = await this.postDatabase.getPostById( commentId )
        if ( !postExist ) throw new CustomError( 404, "Post não encontrado" )

        const commentExist = await this.postDatabase.getCommentById( commentId )
        if ( !commentExist ) throw new CustomError( 404, "Comentário não encontrado" )

        await this.postDatabase.createAnswer( { content }, commentId, userId )
    }

}