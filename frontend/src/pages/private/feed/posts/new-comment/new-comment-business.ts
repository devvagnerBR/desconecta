import { postRequests } from "@/requests/post-requests"
import React from "react"
import { useMutation } from "react-query"
import { queryClient } from '../../../../../libs/react-query';


export const newCommentBusiness = ( postId: string ) => {

    const [comment, setComment] = React.useState<string | null>( '' )
    const req = postRequests()
    const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        setComment( event.target.value )
    }

    const createComment = useMutation( {

        mutationFn: () => req.createComment( postId, comment! ),
        onSuccess: () => {
            queryClient.invalidateQueries( ["posts"] )
            setComment( '' )
            
        }
    } )

    return { comment, handleChange, createComment }

}