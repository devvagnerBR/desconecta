import { User } from '@/context/user-context'
import React from 'react'

export const Avatar = ( { data }: { data: User } ) => {

    return (
        <>
            {data?.avatar ? <div className="w-12 relative shrink-0">
                <img src={data?.avatar} alt="avatar" className="w-full shrink-0 shadow-md rounded-full" />
                <p className="h-4 w-4 cursor-pointer bg-primary-400 rounded-full absolute top-8 left-8 border shadow-md" />
            </div> : <div>
                <div className="w-12 h-12 bg-primary-400 rounded-full flex items-center justify-center">
                    <p className="text-white text-2xl leading-none">{data?.username?.charAt( 0 ).toUpperCase()}</p>
                </div>
            </div>}
        </>
    )
}
