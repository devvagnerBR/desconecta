import React from "react";
import { ModalProps } from "./use-modal";

export const handleCloseEvent = ( ref: React.RefObject<HTMLDivElement>, modal: ModalProps ) => {

    React.useEffect( () => {
        function handleClickOutside( event: MouseEvent ) {
            if ( ref.current && !ref.current.contains( event.target as Node ) ) {
                modal.close()
            }
        }

        document.addEventListener( "mousedown", handleClickOutside, true );
        return () => {
            document.removeEventListener( "mousedown", handleClickOutside, true );
        };

    }, [] )

}