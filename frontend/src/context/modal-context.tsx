import { useModal } from "@/hooks/use-modal";
import { setBodyAsOverflowHidden } from "@/utils/set-body-as-overflow-hidden";
import React from "react";


export interface ModalContext {

    newPost: ReturnType<typeof useModal>

}

const ModalContext = React.createContext<ModalContext | null>( null )

const ModalContextProvider = ( { children }: React.PropsWithChildren ) => {

    const newPost = useModal()

    const shouldSetOverflowhidden = newPost.isOpen
    setBodyAsOverflowHidden( shouldSetOverflowhidden )

    return (
        <ModalContext.Provider value={{ newPost }}>
            {children}
        </ModalContext.Provider>
    )
}

const useModalContext = () => {

    const context = React.useContext( ModalContext )
    if ( !context ) throw new Error( "UseData precisa estar dentro de um provider" );
    return context

}

export { ModalContextProvider, useModalContext }