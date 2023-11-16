import { PRISMA } from "@/libs/prisma";
import { Prisma, Course } from "@prisma/client";


export class COURSE_DATABASE {

    async findById( id: number ): Promise<Course | null> {
        const course = await PRISMA.course.findUnique( { where: { id } } )
        return course;
    }


}