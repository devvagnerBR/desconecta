
import { BioProfile } from "./bio";
import { AvatarProfile } from "./avatar";
import { useParams } from "react-router-dom"
import { useUserContext } from "@/context/user-context"
import { useSetTitlePage } from "@/hooks/use-title-page"

export const Profile = () => {

  const { username } = useParams<{ username: string }>()
  useSetTitlePage( `${username?.toString()!} - Desconecta` )

  const { data: user , bio } = useUserContext()
  const avatar = user?.avatar

  return (
    <div className='border min-h-full flex flex-col gap-2  w-full h-full  bg-secondary-400'>

      <main className="w-full bg-orange-500">

        <div id="banner" className="bg-primary-400 w-full h-24 relative">
          <AvatarProfile avatar={avatar!} />
        </div>
        <BioProfile bio={bio} />


      </main>
      <main className="p-2  bg-secondary-50">
        section 2
      </main>
    </div>
  )
}
