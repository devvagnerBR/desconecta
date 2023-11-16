import { USER_BUSINESS } from "@/business/user-business";
import { USER_DATABASE } from "@/database/user-database"
import { COURSE_DATABASE } from '../database/course-database';


export const makeUserFactory = () => {

    const userDatabase = new USER_DATABASE();
    const courseDatabase = new COURSE_DATABASE();
    const userBusiness = new USER_BUSINESS( userDatabase, courseDatabase );

    return userBusiness;

}