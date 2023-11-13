import React from 'react'
import { UserContextProvider } from './user-context'


export const ContextProvider = ( { children }: React.PropsWithChildren ) => {

    return (
        <UserContextProvider >
                {children}
        </UserContextProvider>
    )
}
