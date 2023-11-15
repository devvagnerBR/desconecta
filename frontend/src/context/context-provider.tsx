import React from 'react'
import { UserContextProvider } from './user-context'
import { ModalContextProvider } from './modal-context'


export const ContextProvider = ( { children }: React.PropsWithChildren ) => {

    return (
        <UserContextProvider >
            <ModalContextProvider>
                {children}
            </ModalContextProvider>
        </UserContextProvider>
    )
}
