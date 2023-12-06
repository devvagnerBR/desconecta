import { USER_BUSINESS } from "@/business/user-business";
import { USER_DATABASE } from "@/data/user-database"
import { COURSE_DATABASE } from '../data/course-database';
import { POST_DATABASE } from "@/data/post-database";
import { POST_BUSINESS } from "@/business/post-business";
import { ADMIN_DATABASE } from "@/data/admin-database";
import { ADMIN_BUSINESS } from "@/business/admin-business";
import { Storage } from "@/libs/storage";
import { SYSTEM_DATABASE } from "@/data/system-database";
import { SYSTEM_BUSINESS } from "@/business/system-business";


export const makeSystemFactory = () => {

    const systemDatabase = new SYSTEM_DATABASE();
    const systemBusiness = new SYSTEM_BUSINESS( systemDatabase );
    return systemBusiness;

}