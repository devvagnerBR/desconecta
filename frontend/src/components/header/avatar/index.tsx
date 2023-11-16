import { User } from '@/context/user-context'

export const Avatar = ( { data, size = 12 }: { data: User, size?: number } ) => {

    return (
        <>
            {data?.avatar ? <div className={`w-${size} relative shrink-0`}>
                <img src={data?.avatar} alt="avatar" className="w-full shrink-0 shadow-md rounded-full" />
            </div> : <div>
                <div className="w-12 h-12 bg-primary-400 rounded-full flex items-center justify-center">
                    <p className="text-white text-2xl leading-none">{data?.username?.charAt( 0 ).toUpperCase()}</p>
                </div>
            </div>}
        </>
    )
}
