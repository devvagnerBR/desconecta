import { USER_BUSINESS } from "@/business/user-business";
import { USER_DATABASE } from "@/data/user-database"
import { COURSE_DATABASE } from '../data/course-database';
import { POST_DATABASE } from "@/data/post-database";
import { POST_BUSINESS } from "@/business/post-business";


export const makePostFactory = () => {

    const postDatabase = new POST_DATABASE();
    const postBusiness = new POST_BUSINESS( postDatabase );
    return postBusiness;

}