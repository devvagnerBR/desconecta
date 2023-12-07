import React from 'react'


export const useSetTitlePage = ( title: string ) => {

    React.useEffect( () => {
        document.title = title;
    }, [title] );

}