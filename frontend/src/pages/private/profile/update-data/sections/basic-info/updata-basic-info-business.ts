import { useUserContext } from "@/context/user-context";
import { queryClient } from "@/libs/react-query";
import { mutations } from "@/requests/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export interface updateUserProps {
    name?: string
    username?: string
    title?: string
}
export const updateDataBusiness = () => {

    const { data: user } = useUserContext()
    const navigate = useNavigate()
    const { updateUserMutate } = mutations()

    const formUpdateDataValidade = z.object( {

        name: z.string().optional(),
        username: z.string().optional(),
        title: z.string().optional(),

    } )


    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors }
    } = useForm<updateUserProps>( { resolver: zodResolver( formUpdateDataValidade ) } );


    let [isOpen, setIsOpen] = React.useState( false )

    async function closeModal() {
        setIsOpen( false )
        await queryClient.invalidateQueries( ["user"] )
        navigate( `/perfil/${user?.username}` )
    }

    function openModal() {
        setIsOpen( true )
    }

    const onSubmit = handleSubmit( async ( data: updateUserProps ) => {

        const body = {
            username: data.username === user?.username ? undefined : data.username,
            name: data.name === user?.name ? undefined : data.name,
            title: data.title === user?.UserInfos.headline ? undefined : data.title,
        }
        const dataToSend = Object.fromEntries(
            Object.entries( body )
                .filter( ( [key, value] ) => value !== '' )
        );

        // console.log( body )


        if ( !dataToSend.username && !dataToSend.name && !dataToSend.title ) {
            closeModal()
        } else {
            await updateUserMutate( dataToSend )
        }

    } )

    return {
        isOpen,
        closeModal,
        openModal,
        register,
        onSubmit,
        watch,
    }

}