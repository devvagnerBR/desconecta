import { PRISMA } from "@/database/prisma";
import { Prisma, Course } from "@prisma/client";


export class COURSE_DATABASE {

    async findById( id: number ): Promise<Course | null> {
        const course = await PRISMA.course.findUnique( { where: { id } } )
        return course;
    }

    getCourses() {
        return PRISMA.course.findMany( {
            where: { status: true },
            orderBy: { name: 'asc' },
            select: { id: true, name: true, }
        } );
    }

}