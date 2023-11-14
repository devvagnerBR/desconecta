export const textLimit = ( text: string, limit: number ): string => {

    if ( !text ) return ''
    else if ( text.length <= limit ) {
        return text;
    } else {
        return text.substring( 0, limit ) + '...';
    }
}