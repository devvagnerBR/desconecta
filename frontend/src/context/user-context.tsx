import React from "react";
import { getCookie } from "@/libs/cookies-js";

interface UserContextProps {
    isLogged: boolean,
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}

const UserContext = React.createContext<UserContextProps | null>( null )

const UserContextProvider = ( { children }: React.PropsWithChildren ) => {

    const [isLogged, setIsLogged] = React.useState<boolean>( !!getCookie( "token" ) )

    return (
        <UserContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </UserContext.Provider>
    )

}

const useUserContext = () => {

    const context = React.useContext( UserContext )
    if ( !context ) throw new Error( "UseData precisa estar dentro de um provider" );
    return context

}


export { UserContextProvider, useUserContext }