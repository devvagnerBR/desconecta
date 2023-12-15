import * as Icon from "@phosphor-icons/react";
import { registerBusiness } from "./register-business";
import { useCourseContext } from "@/context/course-context";

export const RegisterForm = () => {

    const {
        handleShowPassword,
        showPassword,
        registerLoading,
        onSubmit,
        formComplete,
        register,
        errors
    } = registerBusiness()

    const { courses } = useCourseContext()

    return (
        <form
            onSubmit={onSubmit}
            className='mt-4 flex flex-col gap-4 w-full'>
            <label
                htmlFor='name'
                className='text-sm flex font-medium flex-col gap-1'>
                Nome e sobrenome
                <input
                    {...register( 'name' )}
                    id="name"
                    className='h-10 rounded-sm border pl-2 text-primary-400 placeholder:font-light font-bold'
                    placeholder='Digite aqui o nome de usuário'
                    type="text"
                />
                {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
            </label>
            <label
                htmlFor='username'
                className='text-sm flex font-medium flex-col gap-1'>
                Nome de usuário
                <input
                    {...register( 'username' )}
                    id="username"
                    className='h-10 rounded-sm border pl-2 text-primary-400 placeholder:font-light font-bold'
                    placeholder='Digite aqui o nome de usuário'
                    type="text"
                />
                {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
            </label>
            <label
                htmlFor='email'
                className='text-sm flex font-medium flex-col gap-1'>
                Email institucional
                <input
                    {...register( 'email' )}
                    id="email"
                    className='h-10 rounded-sm border pl-2 text-primary-400 placeholder:font-light font-bold'
                    placeholder='Digite aqui o seu email institucional'
                    type="text"
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </label>
            <label
                htmlFor='curso'
                className='text-sm flex font-medium flex-col gap-1'>
                Curso
                <select className='h-10 rounded-sm border pl-2 text-secondary-700 placeholder:font-light font-normal'
                    {...register( 'curso' )}>
                    id="curso"
                    {courses?.map( ( course ) => {
                        return (
                            <option key={course.id} value={Number( course.id )} className="h-10">{course.name}</option>
                        )
                    } )}
                </select>

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
                {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}

            </label>
            {!registerLoading.loading &&
                <button
                    disabled={!formComplete}
                    type='submit'
                    className={`w-full bg-primary-400 h-10 rounded-sm text-secondary-50 font-bold text-lg disabled:bg-secondary-600`}>
                    Criar conta
                </button>}
            {registerLoading.loading &&
                <button
                    disabled
                    type='submit'
                    className='w-full disabled:bg-primary-400/40 bg-primary-400 h-10 rounded-sm text-secondary-50 font-bold text-lg'>
                    Criando...
                </button>}
        </form>
    )
}
