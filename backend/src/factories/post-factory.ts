import { USER_BUSINESS } from "@/business/user-business";
import { USER_DATABASE } from "@/database/user-database"
import { COURSE_DATABASE } from '../database/course-database';
import { POST_DATABASE } from "@/database/post-database";
import { POST_BUSINESS } from "@/business/post-business";


export const makePostFactory = () => {

    const postDatabase = new POST_DATABASE();
    const postBusiness = new POST_BUSINESS( postDatabase );
    return postBusiness;

}