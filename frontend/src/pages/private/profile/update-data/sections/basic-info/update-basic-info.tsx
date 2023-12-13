import React from 'react'
import { updateDataBusiness } from './updata-basic-info-business'
import { useUserContext } from '@/context/user-context'
import { queryClient } from '@/libs/react-query'

interface UpdateProfileProps {
    closeModal: () => void
}
export const UpdateProfile = ( { closeModal }: UpdateProfileProps ) => {

    const { register,
        onSubmit,
        watch
    } = updateDataBusiness()

    const { data: user, bio } = useUserContext()
    const avatar = user?.avatar

    return (
        <main
            onSubmit={onSubmit}
            className='mt-4 flex flex-col gap-4'>
            <label
                htmlFor='name'
                className='text-sm flex w-full font-medium flex-col gap-1'>
                Seu nome:
                <div className='flex w-full items-center'>
                    {bio.name &&

                        <input
                            autoComplete='off'
                            {...register( 'name' )}
                            defaultValue={watch( 'name' ) === bio.name ? '' : bio.name}
                            id="name"
                            className={` h-10 rounded-sm border flex-1 pl-2  text-primary-400 bg-secondary-50 placeholder:font-light font-light`}
                        />
                    }

                </div>
            </label>


            <label
                htmlFor='username'
                className='text-sm flex w-full font-medium flex-col gap-2'>
                Nome de usuário:
                <div className='flex w-full items-center'>
                    {bio.username &&

                        <input
                            autoComplete='off'
                            {...register( 'username' )}
                            defaultValue={watch( 'username' ) === bio.username ? '' : bio.username}
                            id="username"
                            className={` h-10 rounded-sm border flex-1 pl-2  text-primary-400 bg-secondary-50 placeholder:font-light font-light`}
                            placeholder='devvagner'
                        // type={showPassword ? 'text' : 'password'}
                        />
                    }

                </div>
            </label>

            <label
                htmlFor='title'
                className='text-sm flex w-full font-medium flex-col gap-1'>
                Título:
                <div className='flex w-full items-center'>
                    {bio.headline &&
                        <input
                            autoComplete='off'
                            {...register( 'title' )}
                            maxLength={140}
                            defaultValue={bio.headline}
                            id="title"
                            className={` h-10 rounded-sm border flex-1 pl-2  text-primary-400 bg-secondary-50 placeholder:font-light font-light`}
                        // type={showPassword ? 'text' : 'password'}
                        />
                    }

                </div>
            </label>


            <div className="mt-2 flex gap-4">
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

                    className="inline-flex justify-center items-center rounded-2xl bg-primary-400 font-bold px-4 py-2 text-sm text-secondary-50 hover:bg-primary-400/80 shadow-sm"
                // onClick={closeModal}
                >
                    Salvar alterações
                </button>
            </div>
        </main>
    )
}
