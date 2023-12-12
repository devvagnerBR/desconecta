import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { updateDataBusiness } from './updata-data-business'
import { queryClient } from '@/libs/react-query'


interface ModalUpdateDataProps {
    openModal: () => void,
    closeModal: () => void,
    isOpen: boolean,
    bio: {
        name: string
        username: string
        course: string
        headline: string
        address: string
        email: string
        phone: string
    }
}

export const ModalUpdateData = ( { closeModal, isOpen, bio }: ModalUpdateDataProps ) => {


    const { register,
        onSubmit,
        watch
    } = updateDataBusiness()




    //comparar bio... com o currentValue


    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10  " onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-start justify-center mt-20 max-md:mt-4 p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full h-full  max-w-2xl transform overflow-hidden  rounded-lg bg-white p-6 text-left align-top shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-xl font-bold leading-6 text-secondary-800">
                                    Alterar dados
                                </Dialog.Title>

                                <div
                                    onSubmit={onSubmit}

                                    className='mt-4 flex flex-col gap-4'>
                                    <label
                                        htmlFor='name'
                                        className='text-sm flex w-full font-medium flex-col gap-1'>
                                        Seu nome:
                                        <div className='flex w-full items-center'>
                                            {bio.name &&

                                                <input
                                                    {...register( 'name' )}
                                                    defaultValue={watch( 'name' ) === bio.name ? '' : bio.name}
                                                    id="name"
                                                    className={` h-10 rounded-sm border flex-1 pl-2  text-primary-400 bg-secondary-50 placeholder:font-light font-light`}

                                                // type={showPassword ? 'text' : 'password'}
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
                                        htmlFor='currentPassword'
                                        className='text-sm flex w-full font-medium flex-col gap-1'>
                                        Título:
                                        <div className='flex w-full items-center'>
                                            {bio.headline &&
                                                <input
                                                    {...register( 'title' )}
                                                    defaultValue={bio.headline}
                                                    id="currentPassword"
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
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition >
    )
}
