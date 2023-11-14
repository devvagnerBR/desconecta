import { ContainerApp, Header } from '@/components';
import Banner from "@/assets/images/login-main-img.svg"
import { LoginForm } from '@/pages';
import { NavLink } from 'react-router-dom';
export const Login = () => {

  return (

    <ContainerApp>

      <section className='mt-20 flex items-start justify-around border-secondary-800 rounded-sm h-[calc(100%-10rem)]'>

        <div className='w-full h-full flex items-center justify-center max-lg:hidden'>
          <img src={Banner} alt="" />
        </div>

        <div className='w-full max-w-lg flex flex-col items-center h-full p-4'>

          <header className='flex flex-col gap-1 w-full items-end'>
            <h1 className='text-2xl max-md:text-xl leading-3 font-bold text-end'>Entre com sua conta na Des<span className='text-primary-400'>conecta</span>.</h1>
            <p className='text-end text-xs text-primary-400'>Plataforma para alunos Descomplica.</p>
          </header>

          <section className='w-full h-12 mt-8 border-b flex items-center justify-evenly'>

            <NavLink to="/entrar" end className="w-full h-full __active">
              <div className='h-full flex items-center justify-center w-full cursor-pointer'>
                <p>Já tenho uma conta</p>
              </div>
            </NavLink>

            <NavLink to="/criar-conta" className="w-full h-full">
              <div className='h-full flex items-center justify-center w-full cursor-pointer'>
                <p>Criar conta</p>
              </div>
            </NavLink>

          </section>

          <LoginForm />

        </div>

      </section>

    </ContainerApp>

  )
}
