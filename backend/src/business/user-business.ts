import { USER_DATABASE } from '../database/user-database';
import { Prisma } from '@prisma/client';
import *  as bcrypt from 'bcryptjs';
import { env } from '@/env';
import { CustomError } from '@/entities/custom-error';
import { COURSE_DATABASE } from '@/database/course-database';

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    course_id: number;
}

interface AuthenticateRequest {
    email: string;
    password: string;
}

export class USER_BUSINESS {

    constructor(
        private userDatabase: USER_DATABASE,
        private courseDatabase: COURSE_DATABASE
    ) { }

    async create( { username, email, password, course_id }: RegisterRequest ): Promise<void> {

        const passwordHash = await bcrypt.hash( password, env.BCRYPT_SALT )

        const courseExists = await this.courseDatabase.findById( course_id )
        if ( !courseExists ) throw new CustomError( 404, "curso não encontrado" )

        const usernameExists = await this.userDatabase.fingByUsername( username )
        if ( usernameExists ) throw new CustomError( 409, "nome de usuário já cadastrado" )

        const emailExists = await this.userDatabase.findByEmail( email )
        if ( emailExists ) throw new CustomError( 409, "email já cadastrado" )

        const data: RegisterRequest = {
            username,
            email,
            password: passwordHash,
            course_id
        }

        await this.userDatabase.create( data )
    }

    async authenticate( data: AuthenticateRequest ): Promise<string> {

        const user = await this.userDatabase.findByEmail( data.email )
        if ( !user ) throw new CustomError( 404, "usuário não encontrado" )

        const doesPasswordMatch = await bcrypt.compare( data.password, user.password )
        if ( !doesPasswordMatch ) throw new CustomError( 401, "credencias inválidas" )

        return user.id
    }

    async profile( userId: string ) {
        const user = await this.userDatabase.profile( userId )
        if ( !user ) throw new CustomError( 404, "usuário não encontrado" )

        return user
    }

    async update( userId: string, data: Prisma.UserUpdateInput ) {

        const user = await this.userDatabase.findById( userId )
        if ( !user ) throw new CustomError( 404, "usuário não encontrado" )

        await this.userDatabase.update( userId, data )
    }
}