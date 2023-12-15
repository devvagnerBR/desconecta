import { PRISMA } from "@/database/prisma";
import { AvatarType } from "@prisma/client";



export class ADMIN_DATABASE {

    async uploadAvatar( userId: string, url: string, gender: AvatarType ) {
        await PRISMA.avatar.create( {
            data: {
                url,
                gender,
                created_by_id: userId
            }
        } )
    }



}