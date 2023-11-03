import Logo from "@/assets/images/logo.png"
export const Header = () => {
    return (
        <header className='h-20 max-lg:px-4  flex items-center'>
            <img src={Logo} alt="logo desconecta" />
        </header>
    )
}
