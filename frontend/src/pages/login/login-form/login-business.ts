import { useLoading } from '@/hooks'
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

    const onSubmit = handleSubmit( async ( data ) => {
        try {
            console.log( "comecei aqui" )
            loginLoading.execute( async () => {
                "EXECUTEI"
                console.log( data )
                console.log( loginLoading.loading )
            } )
        } catch ( error: any ) {
            throw new Error( error.message )
        }
    } )

    const currentValues = watch();
    const formComplete = currentValues.email && currentValues.password;

    return {
        showPassword,
        handleShowPassword,
        register,
        errors,
        onSubmit,
        getValues,
        loginLoading,
        currentValues,
        formComplete
    }
}
