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


}