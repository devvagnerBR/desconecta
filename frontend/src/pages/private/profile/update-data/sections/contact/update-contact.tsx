import React from 'react'
import { updateContactBusiness } from './update-contact-business'
import { useUserContext } from '@/context/user-context'
import { queryClient } from '@/libs/react-query'
import { viaCEP } from '@/services/via-cep'
import InputMask from "react-input-mask";


interface UpdateContactProps {
    closeModal: () => void
}

export const UpdateContact = ( { closeModal }: UpdateContactProps ) => {

    const { contact } = useUserContext()
    const { register, watch, setValue, onSubmit } = updateContactBusiness()

    const cep = watch( 'cep' );


    React.useEffect( () => {

        const getAddress = async () => {

            if ( !cep ) return
            const address = await viaCEP( cep ?? "" )
            address.cep && setValue( 'address', `${address.bairro},${address.localidade}, ${address.uf}` )
        }

        const timer = setTimeout( () => {
            cep && getAddress()
        }, 900 )

        return () => clearTimeout( timer )

    }, [cep] )

    React.useEffect( () => {

        if ( !contact ) return
        setValue( 'cep', contact.cep )
        setValue( 'address', contact.address )
        setValue( 'phone', contact.phone )

    }, [contact] )
    
    return (
        <section
            className='mt-4 flex flex-col gap-4'>
            <label
                htmlFor='email'
                className='text-sm flex w-full font-medium flex-col gap-1'>
                Email:
                <div className='flex w-full items-center'>
                    <input
                        autoComplete='off'
                        disabled
                        defaultValue={contact.email}
                        type='email'
                        id="email"
                        className={` h-10 disabled:bg-secondary-400 text-secondary-800/60 rounded-sm border flex-1 pl-2 bg-secondary-50 placeholder:font-light font-light`}
                    />
                </div>
            </label>

            <label
                htmlFor='cep'
                className='text-sm flex w-full font-medium flex-col gap-1'>
                CEP:
                <div className='flex w-full items-center'>
                    <InputMask
                        mask="99999-999"

                        placeholder='00000-000'
                        {...register( 'cep' )}
                        defaultValue={contact.cep && watch( 'cep' ) === contact.cep ? '' : contact.cep}
                        type='text'
                        id="cep"
                        className={` h-10 border-r-0 rounded-sm border flex-1 pl-2 text-primary-400 bg-secondary-50 placeholder:font-light font-light`}
                    />
                </div>
            </label>

            <label
                htmlFor='address'
                className='text-sm flex w-full font-medium flex-col gap-1'>
                Endereço:
                <div className='flex w-full items-center'>
                    <input
                        defaultValue={watch( 'address' )}
                        type='text'
                        disabled
                        id="address"
                        className={` h-10 disabled:bg-secondary-400 text-secondary-800/60 rounded-sm border flex-1 pl-2 bg-secondary-50 placeholder:font-light font-light`}
                    />
                </div>
            </label>
            <label
                htmlFor='phone'
                className='text-sm flex w-full font-medium flex-col gap-1'>
                Telefone:
                <div className='flex w-full items-center'>
                    <InputMask
                        mask={"(99) 99999-9999"}
                        {...register( 'phone' )}

                        placeholder='(00) 00000-0000'
                        defaultValue={contact.phone && contact.phone ? contact.phone : ""}
                        type='text'
                        id="phone"
                        className={` h-10 rounded-sm border flex-1 pl-2 text-primary-400 bg-secondary-50 placeholder:font-light font-light`}
                    />
                </div>
            </label>
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

                    className="inline-flex justify-center items-center rounded-2xl bg-primary-400 font-bold px-4 py-2 text-sm text-secondary-50 hover:bg-primary-400/80 shadow-sm"
                // onClick={closeModal}
                >
                    Salvar alterações
                </button>
            </div>
        </section>
    )
}
