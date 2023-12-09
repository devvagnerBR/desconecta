import { useLoading } from '@/hooks'
import { userRequests } from '@/requests'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


export type LoginFormProps = {
    email: string
    password: string
}

const formLoginValidade = z.object( {

    email:
        z.string().nonempty( "Campo obrigatório" ).email( "Email inválido" ),
    password:
        z.string().nonempty( "Campo obrigatório" )

} )

export const loginBusiness = () => {

    const loginLoading = useLoading();
    const { login } = userRequests();


    const [showPassword, setShowPassword] = React.useState<Boolean>( false )

    const handleShowPassword = () => {
        setShowPassword( !showPassword )
    }

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors }
    } = useForm<LoginFormProps>( { resolver: zodResolver( formLoginValidade ) } );

    const onSubmit = handleSubmit( async ( data: LoginFormProps ) => {
        loginLoading.execute( async () => {
            await login.mutateAsync( data );
        } )

    } )

    const currentValues = watch();
    const formComplete = currentValues.email && currentValues.password;

    interface LoginError {
        response: {
            data: {
                message: string;
            };
        };
    }


    let loginErrorMessage: string | undefined
    if ( login.error ) {
        let { response: { data: { message: msg } } }: LoginError = login?.error as LoginError;
        loginErrorMessage = msg
    }








    return {
        showPassword,
        handleShowPassword,
        register,
        errors,
        onSubmit,
        getValues,
        loginLoading,
        currentValues,
        formComplete,
        loginErrorMessage


    }
}
