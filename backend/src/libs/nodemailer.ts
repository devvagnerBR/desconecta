import { env } from '@/env';
import nodemailer from 'nodemailer';


export class ValidateAccount {

    async generateCode() {

        const hash = env.NODEMAILER_HASH as string;
        let code = "";

        for ( let i = 0; i < 6; i++ ) {
            const randomIndex = Math.floor( Math.random() * hash.length )
            code += hash[randomIndex]
        }

        return code
    }

    async sendCode( email: string, code: string ) {

        const mailTransporter = nodemailer.createTransport( {
            service: 'gmail',
            port: 487,
            secure: false,
            auth: {
                user: env.NODEMAILER_EMAIL,
                pass: env.NODEMAILER_PASSWORD
            }, tls: {
                rejectUnauthorized: true
            }
        } )

        const mailDetails = {
            from: env.NODEMAILER_EMAIL,
            to: email,
            subject: 'Código de validação',
            text: `Seu código de validação é: ${code}`
        };

        await mailTransporter.sendMail( mailDetails )
    }

}