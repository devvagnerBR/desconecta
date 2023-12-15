import { COURSE_CONTROLLER } from '@/controller/course-controller';
import { FastifyInstance } from 'fastify';

export const courseRoutes = async ( app: FastifyInstance ) => {

    const course = await COURSE_CONTROLLER()

    app.get( '/courses', course.getCourses )

}