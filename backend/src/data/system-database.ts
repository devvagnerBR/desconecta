import { PRISMA } from "@/database/prisma";
import { Prisma, Course, GenderType, AvatarType } from "@prisma/client";


export class SYSTEM_DATABASE {

    async getAllAvailableAvatars( gender?: AvatarType ): Promise<string[]> {
        const avatars = await PRISMA.avatar.findMany( {
            where: { gender }
        } )
        return avatars.map( avatar => avatar.url )
    }

}