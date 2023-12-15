import React from "react";
import { getCookie, removeCookie } from "@/libs/cookies-js";
import { userRequests } from "@/requests";
import { useQuery } from "react-query";
import { User } from "@/types/user";
import { useLocation, useNavigate } from 'react-router-dom';
import { GO_TO_HOMEPAGE, GO_TO_LOGIN } from "@/router/navigators";

interface UserContextData {
    isLogged: boolean,
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
    data: User | undefined
    bio: {
        name: string
        username: string
        course: string
        headline: string
        address: string
        email: string
        phone: string
    },
    contact: {
        email: string
        phone: string
        address: string
        cep: string
    },
    links: {
        linkedin?: string
        github?: string
        site?: string
    }

}

const UserContext = React.createContext<UserContextData | null>( null )

const UserContextProvider = ( { children }: React.PropsWithChildren ) => {

    const { getUserProfile } = userRequests()
    const navigate = useNavigate()
    const [isLogged, setIsLogged] = React.useState<boolean>( !!getCookie( "token" ) )

    const { pathname } = useLocation()
    const isAuthenticateRoute = pathname === "/entrar" || pathname === "/criar-conta"

    const { data } = useQuery<User>( {
        queryKey: ["user"],
        queryFn: getUserProfile,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60, // 1 min
        enabled: !!getCookie( "token" ),
        onError: () => {
            removeCookie( "token" )
            removeCookie( "refresh_token" )
            setIsLogged( false )
            GO_TO_LOGIN( navigate )

        }
    } )

    React.useLayoutEffect( () => {
        if ( !!data && getCookie( "token" ) ) setIsLogged( true )
        else setIsLogged( false )
    }, [data, pathname, navigate] )

    React.useEffect( () => {
        if ( isLogged && !!data && isAuthenticateRoute ) GO_TO_HOMEPAGE( navigate )
    }, [isLogged] )

    const bio = {
        name: data?.name || '',
        username: data?.username || '',
        course: data?.course?.name || '',
        headline: data?.UserInfos?.headline || '',
        address: data?.UserInfos?.address || '',
        email: data?.email || '',
        phone: data?.UserInfos?.phone || '',
    }


    const contact = {
        email: data?.email || '',
        phone: data?.UserInfos.phone || '',
        address: data?.UserInfos?.address || '',
        cep: data?.UserInfos?.cep || '',
    }



    const links = data?.UserInfos.links || { linkedin: undefined, github: undefined, site: undefined };

    return (
        <UserContext.Provider value={{ isLogged, setIsLogged, data, bio, contact, links }}>
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