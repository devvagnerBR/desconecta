import { USER_BUSINESS } from "@/business/user-business";
import { USER_DATABASE } from "@/database/user-database"


export const makeUserFactory = () => {

    const userDatabase = new USER_DATABASE();
    const userBusiness = new USER_BUSINESS( userDatabase );
    return userBusiness;

}