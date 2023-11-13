import { ContextProvider } from '@/context/context-provider'
import { Feed, Login, Register } from '@/pages'
import { BrowserRouter, Routes, Route } from "react-router-dom"


export const Routers = () => {

    return (
        <BrowserRouter>
            <ContextProvider>
                <Routes>
                    <Route path='/entrar' element={<Login />} />
                    <Route path='/criar-conta' element={<Register />} />
                    <Route path='/' element={<Feed />} />
                </Routes>
            </ContextProvider>
        </BrowserRouter>
    )
}
