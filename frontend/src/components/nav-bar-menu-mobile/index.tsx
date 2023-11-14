import { menuMobileData } from '@/data'
import React from 'react'
import { NavLink } from 'react-router-dom'

export const MenuMobile = () => {
    return (
        <div className='h-20 z-50 bg-secondary-200 sm:hidden w-full bottom-0 flex items-center justify-evenly  absolute'>

            {menuMobileData.map( ( item ) => {
                return (
                    <NavLink key={`${item.text}-${item.id}}`} to={item.route} className="sidebar_mobile_active">
                        <div className='flex h-14 w-14 rounded-full  items-center justify-center'>
                            <item.icon weight="light" className="fill-secondary-600" size={30} />
                        </div>
                    </NavLink>
                )
            } )}

        </div>
    )
}
