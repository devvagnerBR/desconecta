import Logo from "@/assets/images/logo.png"
import { useLocation } from "react-router-dom"
import { Avatar, SearchBar } from "@/components"
import logoShortCut from "@/assets/images/logo-shortcut.svg"
import { getPageWidth } from "@/utils/get-page-width"
import { textLimit } from "@/utils/text-limit"
import { useUserContext } from "@/context/user-context"

export const Header = () => {

    const { size } = getPageWidth()
    const { data } = useUserContext()
    const { pathname } = useLocation()

    const isSessionPage = pathname === '/entrar' || pathname === '/criar-conta'

    if ( isSessionPage ) return null
    return (
        <header className={` h-20 flex justify-center items-center`}>
            <main className="w-screen h-full flex items-center max-w-[1024px] max-xl:max-w-none justify-start border-r">
                <div className="h-full w-48 max-md:w-fit items-center flex justify-start shrink-0 max-md:pl-2">
                    <img src={Logo} alt="logo desconecta" className="max-md:hidden pl-2" />
                    <img src={logoShortCut} alt="logo desconecta" className="md:hidden" />
                </div>

                <div className="md:border-l h-full flex items-center justify-center w-full">
                    <div className="w-full flex h-full  items-center justify-start pl-2">
                        <SearchBar />
                    </div>
                    <div className="w-full flex gap-4 h-full items-center justify-end pr-2">
                        <div className="flex flex-col gap-1 shrink-0 no_click">
                            <p className="text-end text-lg leading-none"><span className="text-primary-400 text-base font-bold leading-3">@</span>{data?.username}</p>
                            <p className="text-primary-400 text-sm leading-none shrink-0 max-sm:text-xs">{textLimit( data?.course?.name, size / 12 )}</p>
                        </div>
                        <Avatar data={data} />
                    </div>
                </div>
            </main>
        </header>
    )
}
