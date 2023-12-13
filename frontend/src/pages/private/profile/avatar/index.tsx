import React from 'react'
import * as Icon from "@phosphor-icons/react"

export const AvatarProfile = ( { avatar }: { avatar: string } ) => {

    const [isHovered, setIsHovered] = React.useState( false )




    return (
        <div
            onMouseEnter={() => setIsHovered( true )}
            onMouseLeave={() => setIsHovered( false )}
            className="w-24 h-24 rounded-full overflow-hidden border-2 absolute top-4 bg-secondary-50 left-2 shadow-md">
            <div className="w-24 h-24">
                <img
                    src={avatar}
                    alt={`avatar`}
                    className="w-24 h-24 absolute object-cover object-top  top-0 left-0" />

                {isHovered &&
                    <div className="w-24 h-24  bg-secondary-800/50 absolute top-0 left-0 flex flex-col items-center justify-center cursor-pointer">
                        <Icon.Camera size={26} className="fill-secondary-50" />
                        <span className="text-white text-sm">Alterar</span>
                    </div>}
            </div>
        </div>
    )
}
