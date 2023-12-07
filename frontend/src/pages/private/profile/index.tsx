
import { useSetTitlePage } from "@/hooks/use-title-page"
import React from "react"
import { useParams } from "react-router-dom"

export const Profile = () => {

  const { username } = useParams<{ username: string }>()
  useSetTitlePage( `${username?.toString()!} - Desconecta` )



  return (
    <div className='border min-h-full  w-full h-full p-4 bg-secondary-400'>
      PERFIL
    </div>
  )
}
