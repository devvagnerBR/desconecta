import { useModalContext } from "@/context/modal-context"
import { useUserContext } from "@/context/user-context"
import { handleCloseEvent } from "@/hooks/use-modal-event"
import { mutations } from "@/requests/mutations"
import { GO_TO_PROFILE } from "@/router/navigators"
import React from "react"
import { useNavigate } from "react-router-dom"


export const ModalProfileMenu = () => {


    const { logOutMutate } = mutations()
    const { modalProfileMenu } = useModalContext()
    const navigate = useNavigate()
    const { data: user } = useUserContext()
    const menuRef = React.useRef<HTMLDivElement | null>( null );

    handleCloseEvent( menuRef, modalProfileMenu )

    if ( !modalProfileMenu.isOpen ) return null
    return (
        <div
            ref={menuRef}
            className='absolute z-50 flex flex-col items-center min-w-[126px] right-2 top-[55px] rounded-md bg-secondary-50 border p-2'>
            <li
                onClick={() => {
                    GO_TO_PROFILE( navigate, user?.username.toLowerCase()! )()
                    modalProfileMenu.close()
                }}
                className=' rounded-md w-full h-8 items-center justify-center flex hover:cursor-pointer hover:bg-secondary-200 transition-all'>
                Perfil
            </li>
            <li
                onClick={async () => {
                    modalProfileMenu.close()
                    await logOutMutate()
                }}
                className=' rounded-md w-full h-8 items-center justify-center flex hover:cursor-pointer hover:bg-secondary-200 transition-all'>
                Sair
            </li>
        </div>
    )
}
