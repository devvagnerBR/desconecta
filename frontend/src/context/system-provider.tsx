import React from "react";
import { useQuery } from "react-query";
import { api } from "@/libs/axios";


interface CourseContextProps {

    avatars: { id: string, gender: "MALE" | "FEMALE", url: string }[] | undefined


}

const SystemContext = React.createContext<CourseContextProps | null>( null )

const SystemContextProvider = ( { children }: React.PropsWithChildren ) => {

    const { data: avatars } = useQuery<{ id: string, gender: "MALE" | "FEMALE", url: string }[]>( {
        queryKey: ["avatars"],
        queryFn: async () => {
            const courses = await api.get( '/avatars' )
            return courses.data
        }
    } )





    return (
        <SystemContext.Provider value={{ avatars }}>
            {children}
        </SystemContext.Provider>
    )

}

const useSystemContext = () => {

    const context = React.useContext( SystemContext )
    if ( !context ) throw new Error( "useSystemContext precisa estar dentro de um provider" );
    return context

}


export { SystemContextProvider, useSystemContext }