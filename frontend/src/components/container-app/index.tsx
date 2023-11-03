import React from 'react'

export const ContainerApp = ( { children }: React.PropsWithChildren ) => {

    return (
        <div className='flex items-center justify-center'>
            <div className='w-screen h-screen max-w-[1024px] items-center justify-center'>
                {children}
            </div>
        </div>
    )
}
