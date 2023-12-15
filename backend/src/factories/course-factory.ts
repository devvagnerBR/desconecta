import { USER_DATABASE } from "@/data/user-database"
import { ADMIN_DATABASE } from "@/data/admin-database";
import { ADMIN_BUSINESS } from "@/business/admin-business";
import { Storage } from "@/libs/storage";
import { COURSE_DATABASE } from "@/data/course-database";
import { COURSE_BUSINESS } from "@/business/course.business";


export const makeCourseFactory = () => {

    const courseDatabase = new COURSE_DATABASE();
    const courseBusiness = new COURSE_BUSINESS( courseDatabase );

    return courseBusiness;

}