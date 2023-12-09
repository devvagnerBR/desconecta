import React from "react";
import { getCookie } from "@/libs/cookies-js";
import { userRequests } from "@/requests";
import { useQuery } from "react-query";
import { User } from "@/types/user";



interface UserContextData {
    isLogged: boolean,
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
    data: User | undefined
}

const UserContext = React.createContext<UserContextData | null>( null )

const UserContextProvider = ( { children }: React.PropsWithChildren ) => {

    const [isLogged, setIsLogged] = React.useState<boolean>( !!getCookie( "token" ) )
    const { getUserProfile } = userRequests()

    const { data } = useQuery<User>( {
        queryKey: ["user"],
        queryFn: getUserProfile,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60, // 1 min
        enabled: !!getCookie( "token" )
    } )

    React.useEffect( () => {
        if ( !!data && getCookie( "token" ) ) {
            setIsLogged( true )
        }
    }, [data] )


    return (
        <UserContext.Provider value={{ isLogged, setIsLogged, data }}>
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