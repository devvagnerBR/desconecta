import { useLoading } from '@/hooks';
import React from 'react'
import { RegisterForm } from './index';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { userRequests } from '@/requests';

export type RegisterFormProps = {
    curso: number
    name: string,
    username: string
    email: string
    password: string
}
const formRegisterValidade = z.object( {

    name:
        z.string().nonempty( "Campo obrigatório" ),
    curso:
        z.coerce.number().min( 1 ).max( 3 ),
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
    const { register: signIn } = userRequests();

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
    const formComplete = currentValues.curso && currentValues.username && currentValues.email && currentValues.password && currentValues.name;


    const onSubmit = handleSubmit( async ( data: RegisterFormProps ) => {
        registerLoading.execute( async () => {
            await signIn.mutateAsync( data );
        } )
    } )

    return {
        register,
        showPassword,
        handleShowPassword,
        registerLoading,
        formComplete,
        onSubmit,
        errors
    }
}
