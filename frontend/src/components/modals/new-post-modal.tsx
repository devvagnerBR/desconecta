import { useUserContext } from '@/context/user-context'
import { Avatar } from '@/components/header/avatar'
import * as Icon from "@phosphor-icons/react"


export const NewPostModal = () => {

    const { data } = useUserContext()

    return (
        <div className='w-screen max-w-3xl max-h-[340px] max-sm:max-h-none h-screen bg-white rounded-sm shadow-sm px-4'>
            <header className='w-full h-20 flex items-center justify-between '>
                <div className='flex gap-2 items-center'>
                    <Avatar data={data} />
                    <div className='flex flex-col gap-1'>
                        <p className='text-lg leading-5 font-semibold'>
                            <span className='text-primary-400 font-bold text-base'>@</span>
                            {data?.username}
                        </p>
                    </div>
                </div>
                <Icon.X size={26} className='fill-secondary-800' weight='light' />
            </header>
            <main className='w-full  mt-4'>
                <textarea
                    placeholder='Compartilhe algo novo ...'
                    maxLength={600}
                    className='placeholder:font-light text-primary-400 text rounded-sm w-full max-sm:max-h-80 max-sm:h-80 h-40   max-h-40 p-2'>
                </textarea>
                <div className='flex items-end justify-end mt-4 gap-2'>
                    <div className='flex items-center justify-end '>
                        <p className="shrink-0 text-sm">Compatilhar como:</p>
                        <select className="shrink-0 cursor-pointer bg-secondary-200border shadow-sm  text-secondary-800 font-light text-sm">
                            <option >Global</option>
                            <option >Curso</option>
                        </select>
                    </div>
                    <button className='bg-primary-400 rounded-sm h-10 border rounded-l-none border-primary-400 text-secondary-50 font-semibold text-lg px-4'>
                        Postar
                    </button>
                </div>
            </main>
        </div>
    )
}
