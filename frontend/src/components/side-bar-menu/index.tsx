import { NavLink } from "react-router-dom"
import * as Icon from "@phosphor-icons/react"

export const SidebarMenu = () => {
    return (
        <div className='flex flex-col gap-4 w-48 shrink-0'>
            <NavLink
                to="/"
                className="flex gap-4 items-center sidebar_active">
                <Icon.House weight="light" className="fill-secondary-600" size={24} />
                <p className="text-secondary-600">Página Inicial</p>
            </NavLink>
            <NavLink
                to="/notificacoes"
                className="flex gap-4 items-center sidebar_active">
                <Icon.Bell weight="light" className="fill-secondary-600" size={24} />
                <p className="text-secondary-600">Notificações</p>
            </NavLink>
            <NavLink
                to="/perfil"
                className="flex gap-4 items-center sidebar_active">
                <Icon.User weight="light" className="fill-secondary-600" size={24} />
                <p className="text-secondary-600">Perfil</p>
            </NavLink>
            <NavLink
                to="/salvos"
                className="flex gap-4 items-center sidebar_active">
                <Icon.Bell weight="light" className="fill-secondary-600" size={24} />
                <p className="text-secondary-600">Salvos</p>
            </NavLink>
            <NavLink
                to="/hashtag"
                className="flex gap-4 items-center sidebar_active">
                <Icon.Hash weight="light" className="fill-secondary-600" size={24} />
                <p className="text-secondary-600">Hashtags</p>
            </NavLink>
        </div>
    )
}
