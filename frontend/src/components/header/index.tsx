import Logo from "@/assets/images/logo.png"
import { useLocation } from "react-router-dom"
import { SearchBar } from ".."


export const Header = () => {

    const { pathname } = useLocation()
    const isSessionPage = pathname === '/entrar' || pathname === '/criar-conta'

    return (
        <header className='h-20   flex justify-center items-center'>
            <main className="w-screen h-full flex items-center max-w-[1024px] justify-start">
                <div className="h-full w-48 items-center flex justify-start shrink-0">
                    <img src={Logo} alt="logo desconecta" />
                </div>

                <div className="border-l h-full flex items-center justify-center w-full">
                    {/* //search bar */}
                    <div className="w-full flex h-full  items-center justify-start pl-2">
                        <SearchBar />
                    </div>
                    <div className="w-full flex gap-4 h-full items-center justify-end pr-2">
                        <div className="flex flex-col gap-1">
                            <p className="text-end text-lg leading-none"><span className="text-primary-400 text-base font-bold leading-3">@</span>devvagner</p>
                            <p className="text-primary-400 text-sm leading-none">Análise e desenvolvimento de sistemas</p>
                        </div>
                        <div className="w-12 relative">
                            <img src="https://avatars.githubusercontent.com/u/98060673?v=4" alt="avatar" className="w-full shadow-md rounded-full" />
                            <p className="h-4 w-4 cursor-pointer bg-primary-400 rounded-full absolute top-8 left-8 border shadow-md" />
                        </div>
                    </div>
                </div>
            </main>
        </header>
    )
}
