import { ContainerApp, Header, MenuMobile, ModalContainer, SidebarMenu } from '@/components'
import { ContextProvider } from '@/context/context-provider'
import { Login, Register, Notifications, Feed, Saved, Hashtags, Search } from '@/pages'
import { Profile } from '@/pages/private/profile'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const Routers = () => {

    return (
        <BrowserRouter>
            <ContextProvider>
                <Toaster />
                <ModalContainer />
                <Header />
                <ContainerApp>
                    <div className='flex h-full'>
                        <SidebarMenu />
                        <Routes>

                            <Route path='/entrar' element={<Login />} />
                            <Route path='/criar-conta' element={<Register />} />
                            <Route path='/' element={<Feed />} />
                            <Route path='/perfil/:username' element={<Profile />} />
                            <Route path='/notificacoes' element={< Notifications />} />

                            {/* //verificar a rota de perfil ou de outros usuarios */}
                            <Route path='/des/:username' element={< Profile />} />

                            <Route path='/salvos' element={< Saved />} />
                            <Route path='/hashtag' element={< Hashtags />} />
                            <Route path='/pesquisar' element={< Search />} />
                            <Route path='/post/:postId' element={<p>INDIVIDUAL POST</p>} />
                        </Routes>
                        <MenuMobile />
                    </div>
                </ContainerApp>
            </ContextProvider>
        </BrowserRouter>
    )
}
