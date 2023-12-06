import { SYSTEM_DATABASE } from '@/data/system-database';
import { AvatarType } from '@prisma/client';


export class SYSTEM_BUSINESS {

    constructor(
        private systemDatabase: SYSTEM_DATABASE
    ) { }

    async getAllAvailableAvatars( gender?: AvatarType ): Promise<string[]> {
        const avatars = await this.systemDatabase.getAllAvailableAvatars( gender )
        return avatars
    }

}