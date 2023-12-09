import { NewPostInput } from '@/pages/private/feed/new-post/new-post-input'
import { Posts } from './posts'
import React from 'react';
import { PostBusiness } from './posts/posts-business';
import { useSetTitlePage } from '@/hooks/use-title-page';
import { api } from '@/libs/axios';
import { getCookie } from '@/libs/cookies-js';

export const Feed = () => {


    const { fetchNextPage } = PostBusiness()
    useSetTitlePage( 'Página Inicial - Desconecta' )


    React.useEffect( () => {

        const observer = new IntersectionObserver( ( entries ) => {
            if ( entries.some( ( entry ) => entry.isIntersecting ) ) fetchNextPage()
        } )

        const element = document.querySelector( '#watch' );
        if ( element ) observer.observe( element );
        return () => observer.disconnect()

    }, [] )




    return (
        <div className='border min-h-full h-fit w-full  py-4 px-2 bg-secondary-200'>
            <NewPostInput />
            <Posts />
            <p id='watch' />
        </div>
    )
}
