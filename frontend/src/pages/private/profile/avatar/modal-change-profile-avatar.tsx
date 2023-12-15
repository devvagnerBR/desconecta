import { useSystemContext } from '@/context/system-provider'
import React from 'react'
import * as Icon from "@phosphor-icons/react"

export const ModalChangeProfileAvatar = () => {

    const { avatars } = useSystemContext()
    const [selectedAvatar, setSelectedAvatar] = React.useState( "" )

    return (
        <div className='z-30 absolute top-20 left-2 bg-secondary-50  flex flex-col flex-wrap gap-1 rounded-sm p-2  shrink-0 shadow-md mr-2'>
            <header className='py-1  text-secondary-800 flex w-full gap-1 items-center'>
                <Icon.Image size={22} className='fill-primary-400' weight='light' />
                <h3 className='text-lg font-normal text-primary-400 rounded-2xl'>Alterar avatar</h3>
            </header>
            <div className='flex flex-wrap w-96 h-56 overflow-y-scroll scroll_modal border border-primary-400 overflow-hidden  py-2 pl-2 '>
                {avatars?.map( avatar => {
                    const isSelected = selectedAvatar === avatar.id
                    return (
                        <div
                            onClick={() => setSelectedAvatar( avatar.id )}
                            key={avatar.id}
                            className={`rounded-3xl overflow-hidden shrink-0 cursor-pointer border-2  ${isSelected ? "border-primary-400" : "border-transparent"} hover:border-primary-400`}>
                            <img
                                className='flex h-12 w-12 shrink-0'
                                src={avatar.url}
                                alt="" />
                        </div>
                    )
                } )}
            </div>
            <div className='flex gap-2 p-2 pl-0'>


                <button
                    type="button"
                    className="inline-flex justify-center rounded-2xl border border-secondary-800 font-bold px-4 py-2 text-sm text-secondary-800 hover:bg-secondary-600/20 shadow-sm"
                // onClick={closeModal}
                >
                    Fechar
                </button>
                <button
                    type="submit"
                    onClick={async () => {
                        // await onSubmit()
                        // await queryClient.invalidateQueries( ["user"] )
                        // closeModal()
                    }}

                    className="inline-flex justify-center items-center rounded-2xl bg-primary-400 font-bold px-4 py-2 text-sm text-secondary-50 hover:bg-primary-400/80 shadow-sm"
                // onClick={closeModal}
                >
                    Salvar alterações
                </button>


            </div>
        </div >
    )
}
