export const copyToClipboard = ( path: string, value: string ) => {
    navigator.clipboard.writeText( `http://localhost:5173${path}/${value}` );
}
