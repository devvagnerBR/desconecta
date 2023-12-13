import { useUserContext } from "@/context/user-context"
import { mutations } from "@/requests/mutations"
import { unmaskInput } from "@/utils/unmask-input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"

export interface updateContactBusinessProps {
    phone?: string
    cep?: string
    address?: string
}


export const updateContactBusiness = () => {

    const { data: user } = useUserContext()
    const { updateUserMutate } = mutations()
    const formUpdateContactValidade = z.object( {
        cep: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    } )

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setValue,
        control,
        formState: { errors }
    } = useForm<updateContactBusinessProps>( { resolver: zodResolver( formUpdateContactValidade ) } );

    const onSubmit = handleSubmit( async ( data: updateContactBusinessProps ) => {

        let cep = unmaskInput( data.cep! )
        let phone = unmaskInput( data.phone! )
        let address = data.address

        if ( data.phone === "(00) 00000-0000" ) {
            phone = ""
        }

        if ( data.cep === "00000-000" ) cep = ""

        const body = {
            address: data.address === user?.UserInfos.address ? undefined : data.address,
            cep: cep === user?.UserInfos.cep ? undefined : cep,
            phone: phone === user?.UserInfos.phone ? undefined : phone,
        }

        const dataToSend = Object.fromEntries(
            Object.entries( body )
                .filter( ( [key, value] ) => value !== '' && value !== undefined )
        )

        await updateUserMutate( dataToSend )
        cep = ""
        phone = ""
        address = ""

    } )

    return {
        register,
        watch,
        setValue,
        Controller,
        control,
        onSubmit
    }
}
