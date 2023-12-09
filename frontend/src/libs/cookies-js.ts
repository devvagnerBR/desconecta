import Cookies from 'js-cookie';

export const setCookie = ( key: string, value: string ) => {
    Cookies.set( key, value, {
        expires: 60 * 60 * 24 * 30, // 30 days
        path: '/' // cookie available in all pages
    } )
}

export const removeCookie = ( key: string ) => {
    Cookies.remove( key )
}

export const getCookie = ( key: string ) => {
    return Cookies.get( key )
}