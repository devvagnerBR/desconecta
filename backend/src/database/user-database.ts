import { PRISMA } from "@/libs/prisma";
import { Prisma, User } from "@prisma/client";

interface CreateUserRequest extends Prisma.UserCreateInput { course_id: number }

export class USER_DATABASE {

    async create( data: CreateUserRequest ): Promise<void> {
        const user = await PRISMA.user.create( {
            data: {
                username: data.username,
                password: data.password,
                email: data.email
            }
        } )
        
        await PRISMA.courseUser.create( { data: { user_id: user.id, course_id: data.course_id, } } )
    }

    async findByEmail( email: string ): Promise<User | null> {
        const user = await PRISMA.user.findUnique( { where: { email } } )
        return user;
    }

    async fingByUsername( username: string ): Promise<User | null> {
        const user = await PRISMA.user.findUnique( { where: { username } } )
        return user;
    }

    async findById( id: string ): Promise<User | null> {
        const user = await PRISMA.user.findUnique( { where: { id } } )
        return user;
    }
}