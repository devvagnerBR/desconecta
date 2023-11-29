import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostType, postRequests } from '@/requests/post-requests';
import { useMutation } from 'react-query';
import { useModalContext } from '@/context/modal-context';
import { queryClient } from '@/libs/react-query';
import { useToasts } from '@/hooks/use-toasts';

export const newPostModalBusiness = () => {

    const { cretePostNotify } = useToasts()

    const req = postRequests();
    const { newPost } = useModalContext();
    interface newPostFormData {
        content: string;
        type: PostType
    }

    const validateNewPostSchemma = z.object( {
        content: z.string().min( 1 ).max( 600 ),
        type: z.enum( [PostType.PUBLIC, PostType.COURSE] )
    } )

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm<newPostFormData>( {
        resolver: zodResolver( validateNewPostSchemma ),
        defaultValues: { type: PostType.PUBLIC }
    } );

    const contentLength = watch( 'content' )?.length;

    const addNewPost = useMutation( {
        mutationFn: ( data: newPostFormData ) => req.createPost( data.content, data.type ),
        onSuccess: async () => {

            await cretePostNotify()
            newPost.close()
            queryClient.invalidateQueries( ["posts"] )

        }
    } );

    const onSubmit = handleSubmit( async ( data ) => {
        await addNewPost.mutateAsync( data );
    } );

    return { register, contentLength, onSubmit }
}