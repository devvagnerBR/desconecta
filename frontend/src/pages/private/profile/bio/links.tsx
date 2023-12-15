import { useUserContext } from "@/context/user-context"
import * as Icon from "@phosphor-icons/react"

export const Links = () => {

    const { links } = useUserContext()

    if ( !links ) return null
    else return (

        <div className='flex gap-4 mt-1'>
            {links.github &&
                <div className='flex items-start gap-1 cursor-pointer'>
                    <Icon.GithubLogo size={18} weight='light' className='fill-primary-400 hover:shadow-sm ' />
                    <a href={links.github} target="_blank" className='text-secondary-600 font-normal text-sm'>Github</a>
                </div>
            }
            {links.linkedin &&
                <div className='flex items-start gap-1 cursor-pointer'>
                    <Icon.LinkedinLogo size={18} weight='light' className='fill-primary-400 hover:shadow-sm' />
                    <a href={links.linkedin} target="_blank" className='text-secondary-600 font-normal text-sm '>LinkedIn</a>
                </div>
            }
            {links.site &&
                <div className='flex items-start gap-1 cursor-pointer'>
                    <Icon.GithubLogo size={18} weight='light' className='fill-primary-400 hover:shadow-sm' />
                    <a href={links.site} target="_blank" className='text-secondary-600 font-normal text-sm'>Site</a>
                </div>
            }
        </div>

    )
}
