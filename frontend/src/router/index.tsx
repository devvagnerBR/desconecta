import { ContainerApp, Header, MenuMobile, ModalContainer, SidebarMenu } from '@/components'
import { ContextProvider } from '@/context/context-provider'
import { Login, Register, Notifications, Feed, Saved, Hashtags, Search } from '@/pages'
import { Profile } from '@/pages/private/profile'

import { BrowserRouter, Routes, Route } from "react-router-dom"


export const Routers = () => {

    return (
        <BrowserRouter>
            <ContextProvider>
                <ModalContainer />
                <Header />
                <ContainerApp>
                    <div className='flex h-full'>
                        <SidebarMenu />
                        <Routes>
                            <Route path='/entrar' element={<Login />} />
                            <Route path='/criar-conta' element={<Register />} />
                            <Route path='/' element={<Feed />} />
                            <Route path='/notificacoes' element={< Notifications />} />
                            <Route path='/perfil' element={< Profile />} />
                            <Route path='/salvos' element={< Saved />} />
                            <Route path='/hashtag' element={< Hashtags />} />
                            <Route path='/pesquisar' element={< Search />} />
                        </Routes>
                        <MenuMobile />
                    </div>
                </ContainerApp>
            </ContextProvider>
        </BrowserRouter>
    )
}
