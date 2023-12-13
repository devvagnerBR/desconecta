import axios from "axios"

export const viaCEP = async ( cep: string ) => {

        const url = 'https://viacep.com.br/ws/'
        const res = await axios.get( `${url}${cep}/json/` )
        return res.data

}