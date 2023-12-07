import { useSetTitlePage } from "@/hooks/use-title-page"

export const Notifications = () => {

    useSetTitlePage( 'Notificações - Desconecta' )
    
    return (
        <div className='border min-h-full  w-full h-full p-4 bg-secondary-400'>
            NOTIFICAÇÕES
        </div>
    )
}
