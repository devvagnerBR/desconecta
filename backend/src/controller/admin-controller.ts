import { File } from "@/entities/file";
import { makeAdminFactory } from "@/factories/admin-factory";
import { AvatarType } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export interface MulterRequest extends FastifyRequest {
    files: File[];
}

export const ADMIN_CONTROLLER = async () => {

    const adminFactory = makeAdminFactory();

    const uploadAvatar = async ( req: MulterRequest & FastifyRequest, res: FastifyReply ) => {

        const uploadAvatarBodySchema = z.object( {
            gender: z.enum( ["MALE", "FEMALE"] ),
        } );
        const avatars = req.files

        const userId = req.user.sub;

        const { gender } = uploadAvatarBodySchema.parse( req.body );

        await Promise.all( avatars.map( async ( avatar ) => await adminFactory.uploadAvatar( userId, avatar, gender ) ) )

        return res.status( 201 ).send( { message: "Avatar(es) criado(s) com sucesso" } );

    }

    // const uploadAvatar = async ( req: MulterRequest & FastifyRequest, res: FastifyReply ) => {

    //     const uploadAvatarBodySchema = z.object( {
    //         gender: z.enum( ["MALE", "FEMALE"] ),
    //     } );
    //     const avatar = req.file

    //     const userId = req.user.sub;

    //     const { gender } = uploadAvatarBodySchema.parse( req.body );

    //     await adminFactory.uploadAvatar( userId, avatar, gender as AvatarType );

    //     return res.status( 201 ).send( { message: "Avatar criado com sucesso" } );

    // }

    return {
        uploadAvatar
    }
}
