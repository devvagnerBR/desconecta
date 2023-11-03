import { useLoading } from '@/hooks';
import React from 'react'
import { RegisterForm } from './index';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';

export type RegisterFormProps = {
    curso: number
    username: string
    email: string
    password: string
}
const formRegisterValidade = z.object( {

    curso:
        z.string(),
    username:
        z.string().nonempty( "Campo obrigatório" )
            .min( 3, "Mínimo de 3 caracteres" )
            .max( 20, "Máximo de 20 caracteres" ),

    email:
        z.string().nonempty( "Campo obrigatório" ).email( "Email inválido" )
            .min( 3, "Mínimo de 3 caracteres" ),


    password:
        z.string().nonempty( "Campo obrigatório" )
            .min( 6, "Mínimo de 6 caracteres" )

} )

export const registerBusiness = () => {

    const registerLoading = useLoading();
    const [showPassword, setShowPassword] = React.useState<Boolean>( false )

    const handleShowPassword = () => {
        setShowPassword( !showPassword )
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<RegisterFormProps>( { resolver: zodResolver( formRegisterValidade ) } );


    const currentValues = watch();
    const formComplete = currentValues.curso && currentValues.username && currentValues.email && currentValues.password;
    console.log( errors )
    const onSubmit = handleSubmit( async ( data ) => {
        console.log( "comecei aqui" )
        try {

            registerLoading.execute( async () => {
                "EXECUTEI"
                console.log( data )
                console.log( registerLoading.loading )
            } )
        } catch ( error: any ) {
            throw new Error( error.message )
        }
    } )

    return {
        register,
        showPassword,
        handleShowPassword,
        registerLoading,
        formComplete,
        onSubmit
    }
}
