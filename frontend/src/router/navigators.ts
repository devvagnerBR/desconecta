
export const GO_TO_HOMEPAGE = ( navigate: ( navigate: string ) => void ) => () => navigate( '/' )
export const GO_TO_LOGIN = ( navigate: ( navigate: string ) => void ) => () => navigate( '/entrar' )
export const GO_TO_REGISTER = ( navigate: ( navigate: string ) => void ) => () => navigate( '/criar-conta' )

export const GO_TO_PROFILE = ( navigate: ( navigate: string ) => void, username: string ) => () => navigate( `/perfil/${username}` )
export const GO_TO_OTHER_USER_PROFILE = ( navigate: ( navigate: string ) => void, username: string ) => () => navigate( `/des/${username}` )
