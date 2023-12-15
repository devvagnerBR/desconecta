import { makeCourseFactory } from "@/factories/course-factory";
import { FastifyReply, FastifyRequest } from "fastify";

export const COURSE_CONTROLLER = async () => {

    const courseFactory = makeCourseFactory();

    const getCourses = async ( req: FastifyRequest, res: FastifyReply ) => {

        const courses = await courseFactory.getCourses()
        return res.status( 200 ).send( courses )

    }

    return {
        getCourses
    }
}
