import { makeSystemFactory } from "@/factories/system-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";




export const SYSTEM_CONTROLLER = async () => {

    const systemFactory = makeSystemFactory();

    const getAllAvailableAvatars = async ( req: FastifyRequest, res: FastifyReply ) => {

        const genderAvatarSchema = z.object( {
            gender: z.enum( ["MALE", "FEMALE"] ).optional(),
        } )

        const { gender } = genderAvatarSchema.parse( req.query );

        const avatars = await systemFactory.getAllAvailableAvatars( gender );
        return res.status( 200 ).send( avatars );

    }

    return {
        getAllAvailableAvatars
    }
}
