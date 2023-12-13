import { PostAuthor, User } from "@/types/user"


export const Avatar = ( { data, size = 12 }: { data: PostAuthor, size?: number } ) => {



    return (
        <>
            {data?.avatar ?
                <div
                    className={`w-${size} relative shrink-0 cursor-pointer`}>
                    <div className="h-12 w-12 hover:border-primary-400 hover:border-2 duration-75 transition-all cursor-pointer flex items-center justify-center rounded-full overflow-hidden ">
                        <img
                            src={data?.avatar}
                            alt="avatar"
                            className="object-cover w-12 h-12 object-top flex  shadow-md " />
                    </div>
                </div> : <div>
                    <div className="w-12 h-12 bg-primary-400 rounded-full flex items-center justify-center">
                        <p className="text-white text-2xl leading-none">{data?.username?.charAt( 0 ).toUpperCase()}</p>
                    </div>
                </div>}
        </>
    )
}
