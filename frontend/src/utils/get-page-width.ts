import React from "react"

export const getPageWidth = () => {

    const [size, setSize] = React.useState( window.innerWidth )


    React.useEffect( () => {

        const updatePageWidth = () => {
            setSize( window.innerWidth )
        }

        window.addEventListener( 'resize', updatePageWidth );
        return () => {
            window.removeEventListener( 'resize', updatePageWidth )
        }

    }, [] )


    return { size }
}
