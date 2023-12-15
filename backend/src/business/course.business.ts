import { COURSE_DATABASE } from '@/data/course-database';


export class COURSE_BUSINESS {

    constructor(
        private courseDatabase: COURSE_DATABASE,
    ) { }

    async getCourses() {
        const courses = await this.courseDatabase.getCourses();
        return courses;
    }

}