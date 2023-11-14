import React from 'react'

export const ContainerApp = ( { children }: React.PropsWithChildren ) => {

    return (
        <div className='flex items-center justify-center'>
            <div className='w-screen h-[calc(100vh-80px)]  max-w-[1024px] max-xl:max-w-none items-center justify-center'>
                {children}
            </div>
        </div>
    )
}
