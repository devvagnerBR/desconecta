import { useModalContext } from "@/context/modal-context"
import { PostAuthor, User } from "@/types/user"
import * as Icon from "@phosphor-icons/react"
import { useLocation } from "react-router-dom"

export const AvatarHeader = ( { data, size = 12 }: { data: PostAuthor, size?: number } ) => {

    const { modalProfileMenu } = useModalContext()
    const { pathname } = useLocation()

    return (
        <>
            {data?.avatar ?
                <div
                    onClick={() => modalProfileMenu.open()}
                    className={`w-${size} relative shrink-0 cursor-pointer`}>
                    <Icon.CaretDown className="absolute top-9 right-[-4px]  fill-secondary-900" weight="fill" size={20} />
                    <div className="h-12 w-12 hover:border-primary-400 hover:border-2 duration-75 transition-all cursor-pointer flex items-center justify-center rounded-full overflow-hidden">
                        <img src={data?.avatar} alt="avatar" className="h-12 w-12 flex items-center justify-center object-cover object-top   shadow-md " />
                    </div>
                </div> : <div>
                    <div className="w-12 h-12 bg-primary-400 rounded-full flex items-center justify-center">
                        <p className="text-white text-2xl leading-none">{data?.username?.charAt( 0 ).toUpperCase()}</p>
                    </div>
                </div>}
        </>
    )
}
