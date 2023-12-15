import React from 'react'
import { UserContextProvider } from './user-context'
import { ModalContextProvider } from './modal-context'
import { PostContextProvider } from './post-context'
import { CourseContextProvider } from './course-context'
import { SystemContextProvider } from './system-provider'


export const ContextProvider = ( { children }: React.PropsWithChildren ) => {

    return (
        <PostContextProvider>
            <SystemContextProvider>
                <CourseContextProvider>
                    <UserContextProvider >
                        <ModalContextProvider>
                            {children}
                        </ModalContextProvider>
                    </UserContextProvider>
                </CourseContextProvider>
            </SystemContextProvider>
        </PostContextProvider>
    )
}
