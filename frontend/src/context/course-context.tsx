import React from "react";
import { useQuery } from "react-query";
import { api } from "@/libs/axios";


interface CourseContextProps {
    courses: { id: string, name: string }[]

}

const CourseContext = React.createContext<CourseContextProps | null>( null )

const CourseContextProvider = ( { children }: React.PropsWithChildren ) => {

    const { data: courses } = useQuery( {
        queryKey: ["courses"],
        queryFn: async () => {
            const courses = await api.get( '/courses' )
            return courses.data
        }
    } )

    return (
        <CourseContext.Provider value={{ courses }}>
            {children}
        </CourseContext.Provider>
    )

}

const useCourseContext = () => {

    const context = React.useContext( CourseContext )
    if ( !context ) throw new Error( "useCourseContext precisa estar dentro de um provider" );
    return context

}


export { CourseContextProvider, useCourseContext }