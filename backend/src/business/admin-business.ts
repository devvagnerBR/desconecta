import { CustomError } from '@/entities/custom-error';

import { ADMIN_DATABASE } from '@/data/admin-database';
import { AvatarType } from '@prisma/client';
import { File } from '@/entities/file';
import { Storage } from '@/libs/storage';

import { USER_DATABASE } from "./../data/user-database";


export class ADMIN_BUSINESS {

    constructor(
        private userDatabase: USER_DATABASE,
        private adminDatabase: ADMIN_DATABASE,
        private storage: Storage
    ) { }

    async uploadAvatar( userId: string, avatar: File, gender: AvatarType ) {



        console.log( userId );
        const user = await this.userDatabase.findById( userId );

        if ( !user ) throw new CustomError( 404, "usuário não encontrado" );

        // //🟩  verificar se user.role === "ADMIN"

        if ( !avatar ) throw new CustomError( 404, "arquivo não encontrado" );
        if ( !avatar.mimetype.includes( "image" ) ) throw new CustomError( 404, "arquivo inválido" );
        if ( avatar.size > 5000000 ) throw new CustomError( 404, "imagem precisa ser menor que 5MB" );
        if ( typeof avatar !== "object" ) throw new CustomError( 404, "arquivo avatar precisa ser um objeto" );
        if ( !avatar.buffer ) throw new CustomError( 404, "arquivo inválido" );
        if ( !avatar.originalname ) throw new CustomError( 404, "arquivo inválido" );
        if ( !avatar.encoding ) throw new CustomError( 404, "arquivo inválido" );
        if ( !avatar.mimetype ) throw new CustomError( 404, "arquivo inválido" );
        if ( !avatar.size ) throw new CustomError( 404, "arquivo inválido" )

        const url = await this.storage.createImageUrl( avatar );

        await this.adminDatabase.uploadAvatar( userId, url, gender );

    }

}