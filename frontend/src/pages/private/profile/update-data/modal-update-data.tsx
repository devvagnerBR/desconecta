import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { updateDataBusiness } from './sections/basic-info/updata-basic-info-business'
import { queryClient } from '@/libs/react-query'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { UpdateProfile } from './sections/basic-info/update-basic-info'
import { UpdateContact } from './sections/contact/update-contact'
import { UpdateLinks } from './sections/links/update-links'


interface ModalUpdateDataProps {
    openModal: () => void,
    closeModal: () => void,
    isOpen: boolean,
}

export const ModalUpdateData = ( { closeModal, isOpen }: ModalUpdateDataProps ) => {

    const {
        register,
        onSubmit,
        watch
    } = updateDataBusiness()



    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10 " onClose={closeModal}>
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
                <div className="fixed inset-0  overflow-y-auto">
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
                                <main
                                    onSubmit={onSubmit}
                                    className='mt-4 flex flex-col gap-4'>
                                    <header className='flex gap-4 max-sm:flex-col'>
                                        <NavLink end className={"modal_profile"} to="editar">
                                            <p className='text-secondary-600 '>Informações básicas</p>
                                        </NavLink>
                                        <NavLink className={"modal_profile"} to="editar/contato">
                                            <p className='text-secondary-600'>Contato</p>
                                        </NavLink>
                                        <NavLink className={"modal_profile"} to="editar/links">
                                            <p className='text-secondary-600'>Links</p>
                                        </NavLink>
                                        <NavLink className={"modal_profile"} to="editar/curso">
                                            <p className='text-secondary-600'>Curso</p>
                                        </NavLink>
                                    </header>
                                    <Routes>
                                        <Route path='editar' element={<UpdateProfile closeModal={closeModal} />} />
                                        <Route path='editar/contato' element={<UpdateContact closeModal={closeModal} />} />
                                        <Route path='editar/links' element={<UpdateLinks closeModal={closeModal} />} />
                                        <Route path='editar/curso' element={<p>editar curso</p>} />
                                    </Routes>
                                </main>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition >
    )
}
