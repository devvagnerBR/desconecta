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

}