import { api } from "@/libs/axios";
import { getCookie, removeCookie, setCookie } from "@/libs/cookies-js";
import { queryClient } from "@/libs/react-query";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

interface UserLoginRequest {
    email: string;
    password: string;
}
export type RegisterFormProps = {
    curso: number
    username: string
    email: string
    password: string
}

export const userRequests = () => {

    const token = getCookie( "token" )
    const navigate = useNavigate()

    const login = useMutation( {
        mutationFn: async ( { email, password }: UserLoginRequest ) => {
            removeCookie( "token" )
            removeCookie( "refresh_token" )
            await queryClient.invalidateQueries( ["user"] )
            const res = await api.post<{ token: string, refresh_token: string, role: "ADMIN" | "USER" }>( '/user/auth', { email, password } );

            if ( res ) {
                setCookie( "token", res.data.token )
                setCookie( "refresh_token", res.data.refresh_token )
            }
        },
        onSuccess: () => {
            api.defaults.headers.Authorization = `Bearer ${token}`
            navigate( "/" )
        }
    } )

    const register = useMutation( {
        mutationFn: async ( data: RegisterFormProps ) => {
            await api.post( '/register', data )
            const token = await api.get( "token" )
            setCookie( "token", token.data[0] )
        },
        onSuccess: () => navigate( "/" )
    } );

    const getUserProfile = async () => {

        const profile = await api.get( '/user' )
        return profile.data
    }

    const logOut = async () => {
        removeCookie( "token" )
        removeCookie( "refresh_token" )
        await queryClient.invalidateQueries( ["user"] )
    }



    return { login, register, getUserProfile, logOut }
}