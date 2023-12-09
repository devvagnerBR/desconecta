import axios, { AxiosError } from "axios";
import { getCookie, setCookie } from "./cookies-js";

let token = getCookie( "token" );
let isRefreshing = false;
let failedQueue: any = [];

export const api = axios.create( {
    baseURL: import.meta.env.VITE_BASE_URL_API,
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
} );

interface ErrorResponse {
    message: string;
}

api.interceptors.response.use( response => {
    return response;
}, ( error: AxiosError<ErrorResponse> ) => {
    if ( error.response?.status === 401 ) {
        if ( error.response.data.message === "Não autorizado ou token inválido" ) {

            token = getCookie( "token" );
            const originalConfig = error.config as any;

            if ( !isRefreshing ) {

                isRefreshing = true;
                api.get( "/token/refresh", )
                    .then( response => {
                        setCookie( "token", response.data.token );
                        setCookie( "refresh-token", response.data.refreshToken );
                        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
                        failedQueue.forEach( ( request: any ) => request.onSuccess( response.data.token ) );
                        failedQueue = [];
                    } ).catch( err => {
                        failedQueue.forEach( ( request: any ) => request.onFailure( err ) );
                        failedQueue = [];
                        return Promise.reject( err );
                    } ).finally( () => {
                        isRefreshing = false;
                    } );
            }

            return new Promise( ( resolve, reject ) => {
                failedQueue.push( {
                    onSuccess: ( token: string ) => {
                        originalConfig.headers['Authorization'] = `Bearer ${token}`;
                        resolve( api( originalConfig ) )
                    },
                    onFailure: ( err: AxiosError ) => {
                        reject( err );
                    }
                } );
            } );

        } else {


        }
    }
} );