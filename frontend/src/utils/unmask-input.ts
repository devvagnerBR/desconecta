export const unmaskInput = ( value: string ) => {
    //remover tudo que não for número
    let unmaskedValue = value.replace( /\D/g, "" );
    return unmaskedValue;
}