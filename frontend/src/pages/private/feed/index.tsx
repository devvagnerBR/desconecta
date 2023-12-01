import { NewPostInput } from '@/pages/private/feed/new-post/new-post-input'
import { Posts } from './posts'
import React from 'react';
import { usePostContext } from '@/context/post-context';
import { PostBusiness } from './posts/posts-business';


export const Feed = () => {


    const { fetchNextPage } = PostBusiness()

    
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
            <p className='' id='watch' />
        </div>
    )
}
