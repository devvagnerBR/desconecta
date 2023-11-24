import React from 'react'
import { UserContextProvider } from './user-context'
import { ModalContextProvider } from './modal-context'
import { PostContextProvider } from './post-context'


export const ContextProvider = ( { children }: React.PropsWithChildren ) => {

    return (
        <PostContextProvider>
            <UserContextProvider >
                <ModalContextProvider>
                    {children}
                </ModalContextProvider>
            </UserContextProvider>
        </PostContextProvider>
    )
}
