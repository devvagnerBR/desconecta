import Cookies from 'js-cookie';

export const setCookie = ( key: string, value: string ) => {
    Cookies.set( key, value, {
        expires: 3, // 
        path: '/'
    } )
}

export const removeCookie = ( key: string ) => {
    Cookies.remove( key )
}

export const getCookie = ( key: string ) => {
    return Cookies.get( key )
}