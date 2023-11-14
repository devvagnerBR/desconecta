import Logo from "@/assets/images/logo.png"
import { useLocation } from "react-router-dom"
import { SearchBar } from "@/components"
import logoShortCut from "@/assets/images/logo-shortcut.svg"
import { getPageWidth } from "@/utils/get-page-width"
import { textLimit } from "@/utils/text-limit"

export const Header = () => {

    const { size } = getPageWidth()

    const { pathname } = useLocation()
    const isSessionPage = pathname === '/entrar' || pathname === '/criar-conta'

    if (isSessionPage) return null
    return (
        <header className={` h-20 flex justify-center items-center`}>
            <main className="w-screen h-full flex items-center max-w-[1024px] justify-start border-r">
                <div className="h-full w-48 max-md:w-fit items-center flex justify-start shrink-0 pl-4">
                    <img src={Logo} alt="logo desconecta" className="max-md:hidden" />
                    <img src={logoShortCut} alt="logo desconecta" className="md:hidden" />
                </div>

                <div className="md:border-l h-full flex items-center justify-center w-full">
                    <div className="w-full flex h-full  items-center justify-start pl-2">
                        <SearchBar />
                    </div>
                    <div className="w-full flex gap-4 h-full items-center justify-end pr-2">
                        <div className="flex flex-col gap-1 shrink-0">
                            <p className="text-end text-lg leading-none"><span className="text-primary-400 text-base font-bold leading-3">@</span>devvagner</p>
                            <p className="text-primary-400 text-sm leading-none shrink-0 max-sm:text-xs">{textLimit("Análise e desenvolvimento de sistemas", size / 12)}</p>
                        </div>
                        <div className="w-12 relative shrink-0">
                            <img src="https://avatars.githubusercontent.com/u/98060673?v=4" alt="avatar" className="w-full shrink-0 shadow-md rounded-full" />
                            <p className="h-4 w-4 cursor-pointer bg-primary-400 rounded-full absolute top-8 left-8 border shadow-md" />
                        </div>
                    </div>
                </div>
            </main>
        </header>
    )
}
