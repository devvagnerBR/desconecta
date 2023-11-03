import React, { useState } from 'react';

export const useLoading = () => {
    const [loading, setLoading] = useState( false );

    const execute = async ( func: () => Promise<void> ) => {
        setLoading( true );
        await new Promise( resolve => setTimeout( resolve, 2000 ) );

        try {
            await func();
        } finally {
            setLoading( false );
        }
    };

    return {
        loading,
        execute
    };
};
