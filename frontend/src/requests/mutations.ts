import { useMutation } from "react-query"
import { userRequests } from "."
import { GO_TO_LOGIN } from "@/router/navigators"
import { useNavigate } from "react-router-dom"
import { useToasts } from "@/hooks/use-toasts"
import { removeCookie } from "@/libs/cookies-js"
import { queryClient } from "@/libs/react-query"



export const mutations = () => {

    const { logOutNotify, updateProfileNotify } = useToasts()
    const navigate = useNavigate()
    const { logOut, updateData } = userRequests()

    const { mutateAsync: logOutMutate } = useMutation( {
        mutationFn: logOut,
        onSuccess: async () => {
            await logOutNotify()
            removeCookie( "token" )
            removeCookie( "refresh_token" )
            GO_TO_LOGIN( navigate )
        }
    } )

    const { mutateAsync: updateUserMutate } = useMutation( {
        mutationFn: updateData,
        onSuccess: async () => {
            await updateProfileNotify()
            await queryClient.invalidateQueries( ["user"] )
            // toast de alteracao realizada com sucesso
            // close modal?
        }
    } )

    return {
        logOutMutate,
        updateUserMutate
    }

}