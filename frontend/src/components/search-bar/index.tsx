import React from 'react'
import * as Icon from "@phosphor-icons/react"


export const SearchBar = () => {


    return (
        <div className='border rounded-2xl max-md:hidden flex overflow-hidden items-center  h-10 pl-2'>
            <Icon.MagnifyingGlass size={22} className='fill-primary-400 mr-2' />
            <input type="text" placeholder='Pesquisar ...' className='px-2 focus:border-primary-400 h-full text-primary-400 placeholder:font-light placeholder:text-secondary-600' />
        </div>
    )
}
