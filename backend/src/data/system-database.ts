import { PRISMA } from "@/database/prisma";
import { Prisma, Course, GenderType, AvatarType } from "@prisma/client";


export class SYSTEM_DATABASE {

    async getAllAvailableAvatars( gender?: AvatarType ) {
        const avatars = await PRISMA.avatar.findMany( {
            where: { gender },
            select: {
                url: true,
                gender: true,
                id: true,
            }
        } )


        return avatars
    }

}