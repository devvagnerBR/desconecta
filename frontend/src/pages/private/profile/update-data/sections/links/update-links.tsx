import React from 'react'
import { updateLinksBusiness } from './update-links-business'
import { queryClient } from '@/libs/react-query'


interface UpdateLinktProps {
    closeModal: () => void
}

export const UpdateLinks = ( { closeModal }: UpdateLinktProps ) => {

    const {
        register,
        links,
        setValue,
        linksData,
        onSubmit,
        watch
    } = updateLinksBusiness()




    return (
        <section className='mt-4 flex flex-col gap-4'>
            {linksData?.map( ( link ) => {
                return (
                    <label

                        key={link.id}
                        htmlFor={link.name}
                        defaultValue={links[link.name] && links[link.name]}
                        className='text-sm flex w-full font-medium flex-col gap-1 capitalize'>
                        {link.name}:
                        <div className='flex w-full items-center'>
                            <input
                                {...register( link.name )}
                                autoComplete='off'
                                id={link.name}
                                className={` h-10 rounded-sm border flex-1 pl-2  text-primary-400 bg-secondary-50 placeholder:font-light font-light`}
                            />
                        </div>
                    </label>
                )
            } )}
            <div className="mt-3 flex gap-4">
                <button
                    type="button"
                    className="inline-flex justify-center rounded-2xl border border-secondary-800 font-bold px-4 py-2 text-sm text-secondary-800 hover:bg-secondary-600/20 shadow-sm"
                    onClick={closeModal}>
                    Fechar
                </button>
                <button
                    type="submit"
                    onClick={async () => {
                        await onSubmit()
                        await queryClient.invalidateQueries( ["user"] )
                        closeModal()
                    }}

                    className="inline-flex justify-center items-center rounded-2xl bg-primary-400 font-bold px-4 py-2 text-sm text-secondary-50 hover:bg-primary-400/80 shadow-sm">
                    Salvar alterações
                </button>
            </div>
        </section >
    )
}
