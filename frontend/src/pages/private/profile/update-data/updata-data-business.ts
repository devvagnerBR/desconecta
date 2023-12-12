import React from "react"

export const updateDataBusiness = () => {


    let [isOpen, setIsOpen] = React.useState( false )

    function closeModal() {
        setIsOpen( false )
    }

    function openModal() {
        setIsOpen( true )
    }


    return {
        isOpen,
        closeModal,
        openModal
    }

}