import React from 'react';

interface ModalProps {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useModal = (): ModalProps => {

    const [isOpen, setIsOpen] = React.useState<boolean>( false );

    const handleKeyDown = ( event: KeyboardEvent ) => {
        if ( isOpen && event.key === 'Escape' ) {
            close();
        }
    };

    const open = () => {
        setIsOpen( true );
    };

    const close = () => {
        setIsOpen( false );
    };
    // preeciso tambem de uuma funcao que ao licar fora do modal feche 
    

    React.useEffect( () => {
        window.addEventListener( 'keydown', handleKeyDown );
        return () => {
            window.removeEventListener( 'keydown', handleKeyDown );
        };
    }, [isOpen] );

    return { isOpen, open, close };
};
