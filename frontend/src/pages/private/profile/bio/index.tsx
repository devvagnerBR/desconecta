import React from 'react'
import * as Icon from "@phosphor-icons/react"

interface BioProfileProps {
    bio: {
        name: string
        username: string
        course: string
        headline: string
        address: string
        email: string
        phone: string
    }
}

export const BioProfile = ( { bio }: BioProfileProps ) => {

    return (
        <div className='px-2 pb-4 bg-secondary-50'>

            <header className='flex justify-between'>
                <div className='flex flex-col gap-2 items-start'>
                    <div className='flex items-end gap-2 mt-6'>
                        <h1 className='text-2xl leading-4 font-semibold text-secondary-800'>{bio.name}</h1>
                        <h1 className='text-sm font-medium text-primary-400 leading-3'>@{bio.username}</h1>
                    </div>
                    <p className='text-sm text-secondary-600 leading-3'>{bio.course}</p>
                    <p className='text-sm text-secondary-800 leading-5 mt-2 '>{bio.headline}</p>
                    <div className='flex items-end gap-2 max-[400px]:flex-col max-[400px]:items-start'>
                        <div className='flex  items-end gap-1 '>
                            <Icon.MapPin size={16} className='fill-secondary-600' />
                            <span className='text-sm leading-3 text-secondary-600'>{bio.address}</span>
                        </div>
                        <p className='leading-3 text-sm text-primary-400 font-medium cursor-pointer'>Informações de contato</p>
                    </div>
                </div>
                <div className='h-12'>
                    <Icon.PencilSimple
                        size={20}
                        className='cursor-pointer mt-2' />
                </div>
            </header>

        </div>
    )
}