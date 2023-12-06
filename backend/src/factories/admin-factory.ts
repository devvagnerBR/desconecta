import { USER_BUSINESS } from "@/business/user-business";
import { USER_DATABASE } from "@/data/user-database"
import { COURSE_DATABASE } from '../data/course-database';
import { POST_DATABASE } from "@/data/post-database";
import { POST_BUSINESS } from "@/business/post-business";
import { ADMIN_DATABASE } from "@/data/admin-database";
import { ADMIN_BUSINESS } from "@/business/admin-business";
import { Storage } from "@/libs/storage";


export const makeAdminFactory = () => {

    const adminDatabase = new ADMIN_DATABASE();
    const storage = new Storage();
    const userDatabase = new USER_DATABASE();
    const adminBusiness = new ADMIN_BUSINESS( userDatabase, adminDatabase, storage );

    return adminBusiness;

}