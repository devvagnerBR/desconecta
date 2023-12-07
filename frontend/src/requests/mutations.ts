import { useMutation } from "react-query"
import { userRequests } from "."
import { GO_TO_LOGIN } from "@/router/navigators"
import { useNavigate } from "react-router-dom"
import { useToasts } from "@/hooks/use-toasts"



export const mutations = () => {

    const { logOutNotify } = useToasts()
    const navigate = useNavigate()
    const { logOut } = userRequests()

    const { mutateAsync: logOutMutate } = useMutation( {
        mutationFn: logOut,
        onSuccess: async () => {
            await logOutNotify()
            GO_TO_LOGIN( navigate )()
        }
    } )

    return {
        logOutMutate
    }

}