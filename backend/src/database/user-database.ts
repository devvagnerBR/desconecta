import { PRISMA } from "@/libs/prisma";
import { Prisma, User } from "@prisma/client";

interface CreateUserRequest extends Prisma.UserCreateInput { course_id: number }

export class USER_DATABASE {

    async create( data: CreateUserRequest ): Promise<void> {
        const user = await PRISMA.user.create( {
            data: {
                username: data.username,
                password: data.password,
                email: data.email,
                course: {
                    connect: {
                        id: data.course_id
                    }
                }
            }
        } )


    }

    async profile( userId: string ) {

        const user = await PRISMA.user.findUnique( {
            where: { id: userId },
            include: {
                course: true,
            }

        } )


        return user


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

    async update( userId: string, data: Prisma.UserUpdateInput ) {
        await PRISMA.user.update( {
            where: { id: userId }, data: {
                email: data.email,
                username: data.username,
                avatar: data.avatar,
                password: data.password,
            }
        } )
    }
}
