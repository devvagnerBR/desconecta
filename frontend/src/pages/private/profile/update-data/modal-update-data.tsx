import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { updateDataBusiness } from './updata-data-business'


interface ModalUpdateDataProps {
    openModal: () => void,
    closeModal: () => void,
    isOpen: boolean
}

/*
name        
username:
email:
password:
avatar:

*/
export const ModalUpdateData = ( { closeModal, isOpen }: ModalUpdateDataProps ) => {

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

                                <main className='mt-4 flex flex-col gap-4'>
                                    <label
                                        htmlFor='password'
                                        className='text-sm flex w-full font-medium flex-col gap-1'>
                                        Nome e sobrenome:
                                        <div className='flex w-full items-center'>
                                            <input
                                                // {...register( 'password' )}
                                                id="password"
                                                className={` h-10 rounded-sm border flex-1 pl-2  text-primary-400 bg-secondary-50 placeholder:font-light font-bold`}
                                                placeholder="Wagner Luiz"
                                            // type={showPassword ? 'text' : 'password'}
                                            />

                                        </div>
                                    </label>


                                    <label
                                        htmlFor='password'
                                        className='text-sm flex w-full font-medium flex-col gap-2'>
                                        Nome de usuário:
                                        <div className='flex w-full items-center'>
                                            <input
                                                // {...register( 'password' )}
                                                id="password"
                                                className={` h-10 rounded-sm border flex-1 pl-2 text-primary-400 bg-secondary-50 placeholder:font-light font-bold`}
                                                placeholder='devvagner'
                                            // type={showPassword ? 'text' : 'password'}
                                            />

                                        </div>
                                    </label>
                                    <label
                                        htmlFor='password'
                                        className='text-sm flex w-full font-medium flex-col gap-1'>
                                        Email:
                                        <div className='flex w-full items-center'>
                                            <input
                                                // {...register( 'password' )}
                                                id="password"
                                                className={` h-10 rounded-sm border flex-1 pl-2 text-primary-400 bg-secondary-50 placeholder:font-light font-bold disabled:bg-secondary-400/60`}
                                                placeholder='wagnerluizsg@gmail.com'
                                                disabled
                                            // type={showPassword ? 'text' : 'password'}
                                            />

                                        </div>
                                    </label>
                                    <label
                                        htmlFor='password'
                                        className='text-sm flex w-full font-medium flex-col gap-1'>
                                        Senha
                                        <div className='flex w-full items-center'>
                                            <input
                                                // {...register( 'password' )}
                                                id="password"
                                                className={` h-10 rounded-sm border flex-1 pl-2  text-primary-400 bg-secondary-50 placeholder:font-light font-bold`}
                                                placeholder='* * * * * * * * '
                                            // type={showPassword ? 'text' : 'password'}
                                            />

                                        </div>
                                    </label>
                                </main>

                                <div className="mt-4 flex gap-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-2xl border border-secondary-800 font-bold px-4 py-2 text-sm text-secondary-800 hover:bg-secondary-600/20 shadow-sm"
                                        onClick={closeModal}>
                                        Fechar
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center items-center rounded-2xl bg-primary-400 font-bold px-4 py-2 text-sm text-secondary-50 hover:bg-primary-400/80 shadow-sm"
                                        onClick={closeModal}>
                                        Salvar alterações
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
