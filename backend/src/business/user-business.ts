import { USER_DATABASE } from '../database/user-database';
import { Prisma } from '@prisma/client';
import *  as bcrypt from 'bcryptjs';
import { env } from '@/env';
import { CustomError } from '@/entities/custom-error';

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    course_id: number;
}

export class USER_BUSINESS {

    constructor( private userDatabase: USER_DATABASE ) { }

    async create( { username, email, password, course_id }: RegisterRequest ): Promise<void> {

        const passwordHash = await bcrypt.hash( password, env.BCRYPT_SALT )

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
}