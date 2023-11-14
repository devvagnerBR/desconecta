import { api } from "@/libs/axios";
import { setCookie } from "@/libs/cookies-js";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

interface UserLoginRequest {
    email: string; password:
    string;
}
export type RegisterFormProps = {
    curso: number
    username: string
    email: string
    password: string
}

export const userRequests = () => {

    const navigate = useNavigate()

    const login = useMutation( async ( { email, password }: UserLoginRequest ) => {
        await api.post( '/login', { email, password } );
        const token = await api.get( "token" )
        setCookie( "token", token.data[0] )
    }, {
        onSuccess: () => {
            navigate( "/" )
        },
        onError: () => {
            throw new Error( "Email ou senha incorretos" )
        }
    } )

    const register = useMutation( async ( data: RegisterFormProps ) => {

        await api.post( '/register', data );
        const token = await api.get( "token" )
        setCookie( "token", token.data[0] )

    }, {
        onSuccess: () => {
            navigate( "/" )
        },
        onError: () => {
            throw new Error( "Erro ao cadastrar" )
        }
    } );

    const getUserProfile = async () => {
        const user = await api.get( '/profile' );
        return user.data
    }

    return { login, register, getUserProfile }
}