import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const newPostModalBusiness = () => {

    interface newPostFormData {
        content: string;
        type: 0 | 1;
    }

    const validateNewPostSchemma = z.object( {
        content: z.string().min( 1 ).max( 600 ),
        type: z.coerce.number().min( 0 ).max( 1 )
    } )

    const {

        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm<newPostFormData>( {
        resolver: zodResolver( validateNewPostSchemma ),
        defaultValues: { type: 0 }
    } );

    const contentLength = watch( 'content' )?.length;

    const onSubmit = handleSubmit( async ( data ) => {
        console.log( data );
    } );

    return { register, contentLength, onSubmit }
}