import { useUserContext } from "@/context/user-context"
import { mutations } from "@/requests/mutations"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { updateDataBusiness } from "../basic-info/updata-basic-info-business"


export const updateLinksBusiness = () => {

    const { closeModal } = updateDataBusiness()
    const { updateUserMutate } = mutations()
    type LinkData = {
        id: number;
        name: 'linkedin' | 'github' | 'site';
    };
    const linksData: LinkData[] = [
        { id: 1, name: 'linkedin' },
        { id: 2, name: 'github' },
        { id: 3, name: 'site' },
    ]

    const { links } = useUserContext()

    interface updateLinksBusinessProps {
        linkedin?: string
        github?: string
        site?: string
    }

    const formUpdateLinksValidade = z.object( {
        linkedin: z.string().optional(),
        github: z.string().optional(),
        site: z.string().optional(),
    } )

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setValue,
        control,
        formState: { errors }
    } = useForm<updateLinksBusinessProps>( { resolver: zodResolver( formUpdateLinksValidade ) } );


    const onSubmit = handleSubmit( async ( data: updateLinksBusinessProps ) => {

        const body = {
            linkedin: data.linkedin === links.linkedin ? undefined : data.linkedin,
            github: data.github === links.github ? undefined : data.github,
            site: data.site === links.site ? undefined : data.site,
        }

        const send = Object.fromEntries(
            Object.entries( body )
                .filter( ( [key, value] ) => value !== undefined )
        )

        if ( !send.linkedin && !send.github && !send.site ) closeModal()
        else {
            await updateUserMutate( send )
            closeModal()
        }

    } )


    React.useEffect( () => {

        if ( !links ) return
        links.linkedin && setValue( 'linkedin', links.linkedin )
        links.github && setValue( 'github', links.github )
        links.site && setValue( 'site', links.site )

    }, [links] )


    return {
        register,
        handleSubmit,
        getValues,
        watch,
        setValue,
        control,
        errors,
        onSubmit,
        links,
        linksData
    }
}