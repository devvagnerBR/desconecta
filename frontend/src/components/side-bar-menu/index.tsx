import { NavLink, useLocation } from "react-router-dom"
import { menuData } from "@/data"
import { useUserContext } from "@/context/user-context"

export const SidebarMenu = () => {

    const { pathname } = useLocation()
    const { data: user } = useUserContext()

    const isSessionPage = pathname === '/entrar' || pathname === '/criar-conta'

    if ( isSessionPage ) return null
    return (
        <div className='flex flex-col max-sm:hidden gap-4 w-48 shrink-0 pl-2 max-md:pl-4'>
            {menuData.map( ( item ) => {
                const route = item.route === '/perfil' ? `/perfil/${user?.username}` : item.route
                return (
                    <NavLink
                        key={item.id}
                        to={route}
                        className="flex gap-4 items-center sidebar_active">
                        <item.icon weight="light" className="fill-secondary-600" size={24} />
                        <p className="text-secondary-600">{item.text}</p>
                    </NavLink>
                )
            } )}
        </div>
    )
}
