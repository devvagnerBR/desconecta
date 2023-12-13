import { USER_DATABASE } from '../data/user-database';
import { Prisma, User } from '@prisma/client';
import *  as bcrypt from 'bcryptjs';
import { env } from '@/env';
import { CustomError } from '@/entities/custom-error';
import { COURSE_DATABASE } from '@/data/course-database';
import { ValidateAccount } from '@/libs/nodemailer';


interface RegisterRequest {
    name: string
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

    async create( { name, username, email, password, course_id }: RegisterRequest ): Promise<void> {

        const passwordHash = await bcrypt.hash( password, env.BCRYPT_SALT )

        const courseExists = await this.courseDatabase.findById( course_id )
        if ( !courseExists ) throw new CustomError( 404, "curso não encontrado" )

        const usernameExists = await this.userDatabase.fingByUsername( username )
        if ( usernameExists ) throw new CustomError( 409, "nome de usuário já cadastrado" )

        const emailExists = await this.userDatabase.findByEmail( email )
        if ( emailExists ) throw new CustomError( 409, "email já cadastrado" )

        const nodeMailer = new ValidateAccount()
        const code = await nodeMailer.generateCode();

        const data: RegisterRequest = {
            name,
            username,
            email,
            password: passwordHash,
            course_id,
        }

        await this.userDatabase.create( data, code )
    }

    async authenticate( data: AuthenticateRequest ): Promise<User> {

        const user = await this.userDatabase.findByEmail( data.email )
        if ( !user ) throw new CustomError( 404, "usuário não encontrado" )

        const doesPasswordMatch = await bcrypt.compare( data.password, user.password )
        if ( !doesPasswordMatch ) throw new CustomError( 401, "credencias inválidas" )

        return user
    }

    async profile( userId: string ) {
        const user = await this.userDatabase.profile( userId )
        if ( !user ) throw new CustomError( 404, "usuário não encontrado" )
        return user
    }

    async update( userId: string, data: { username?: string, name?: string, title?: string, address?: string, cep?: string, phone?: string } ) {

        const user = await this.userDatabase.findById( userId )
        if ( !user ) throw new CustomError( 404, "usuário não encontrado" )
        
        await this.userDatabase.update( userId, data )
    }

    async sendCodeValidation( userId: string ) {

        const user = await this.userDatabase.findById( userId )
        if ( !user ) throw new CustomError( 404, "usuário não encontrado" )
        if ( !user.email ) throw new CustomError( 404, "usuário não possui email cadastrado" )
        if ( user.is_verified ) throw new CustomError( 409, "email já validado" )

        const auth = await this.userDatabase.getValidationCode( userId );
        if ( !auth ) throw new CustomError( 404, "código de validação não encontrado" )

        const nodeMailer = new ValidateAccount()

        if ( auth.expires_at === null || auth.expires_at && auth.expires_at && auth.expires_at < new Date() ) {
            const code = await nodeMailer.generateCode();
            await this.userDatabase.refreshCode( userId, code )
            await nodeMailer.sendCode( user.email, code )
        } else {
            await nodeMailer.sendCode( user.email, auth.code )
        }
    }

    async validateAccount( userId: string, code: string ) {

        const user = await this.userDatabase.findById( userId )
        if ( !user ) throw new CustomError( 404, "usuário não encontrado" )
        if ( !user.email ) throw new CustomError( 404, "usuário não possui email cadastrado" )
        if ( user.is_verified ) throw new CustomError( 409, "conta já validado" )

        const confirmCode = await this.userDatabase.getValidationCode( userId );
        if ( !confirmCode ) throw new CustomError( 404, "código de validação não encontrado" )
        if ( confirmCode.code !== code ) throw new CustomError( 401, "código de validação inválido" )

        await this.userDatabase.validateAccount( userId );
    }

    async getUserPosts( userId: string ) {

        const posts = await this.userDatabase.getUserPosts( userId )
        if ( !Array.isArray( posts ) ) throw new CustomError( 404, "posts não encontrados" )
        return posts

    }

    async upsertUserInfos( userId: string, data: Prisma.UserInfosCreateInput ) {

        const user = await this.userDatabase.findById( userId )
        if ( !user ) throw new CustomError( 404, "usuário não encontrado" )
        if ( !data.address && !data.birthday && !data.headline && !data.phone && !data.gender ) throw new CustomError( 400, "nenhum dado foi informado" )

        await this.userDatabase.upsertUserInfos( userId, data )

    }
}