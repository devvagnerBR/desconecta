import * as Icon from "@phosphor-icons/react";
import { loginBusiness } from './login-business';


export const LoginForm = () => {

    const {
        register,
        handleShowPassword,
        showPassword,
        onSubmit,
        loginLoading,
        formComplete,
    } = loginBusiness();



    return (
        <form
            className='mt-4 flex flex-col gap-4 w-full'
            onSubmit={onSubmit}>

            <label
                htmlFor='credential'
                className='text-sm flex font-medium flex-col gap-1'>
                Email
                <input
                    {...register( 'email' )}
                    id="credential"
                    className='h-10 rounded-sm border pl-2 text-primary-400 placeholder:font-light font-bold'
                    placeholder='Digite aqui o seu email'
                    type="text"
                />
            </label>

            <label
                htmlFor='password'
                className='text-sm flex w-full font-medium flex-col gap-1'>
                Senha
                <div className='flex w-full items-center'>
                    <input
                        {...register( 'password' )}
                        id="password"
                        className={` h-10 rounded-sm border flex-1 pl-2 border-r-0 text-primary-400 bg-secondary-50 placeholder:font-light font-bold`}
                        placeholder='digite aqui a sua senha'
                        type={showPassword ? 'text' : 'password'}
                    />
                    <div
                        onClick={handleShowPassword}
                        className='w-10 border h-full flex items-center border-l-0 justify-center cursor-pointer'>
                        {!showPassword && <Icon.EyeClosed size={24} className='fill-secondary-600' />}
                        {showPassword && <Icon.Eye size={24} className='fill-secondary-600' />}
                    </div>
                </div>
            </label>

            {!loginLoading.loading &&
                <button
                    disabled={!formComplete}
                    type='submit'
                    className={`w-full bg-primary-400 h-10 rounded-sm text-secondary-50 font-bold text-lg disabled:bg-secondary-600`}>
                    Entrar
                </button>}
            {loginLoading.loading &&
                <button
                    disabled
                    type='submit'
                    className='w-full disabled:bg-primary-400/40 bg-primary-400 h-10 rounded-sm text-secondary-50 font-bold text-lg'>
                    Entrando...
                </button>}

        </form >
    )
}
