import React from 'react'
import * as Icon from "@phosphor-icons/react"

export const SearchBar = () => {
    return (
        <div className='border flex items-center rounded-sm h-10 pl-2'>
            <Icon.MagnifyingGlass size={22} className='fill-primary-400 mr-2' />
            <input type="text" placeholder='pesquisar ...' className='px-2 focus:border-primary-400 h-full text-primary-400 placeholder:text-secondary-600' />
        </div>
    )
}
