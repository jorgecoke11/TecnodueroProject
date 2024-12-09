import axios from "axios";
import Constantes from '../js/Constantes.js';

const baseUrl = Constantes.URI + 'api/robots/tiposcaso/'


const getTiposDeCaso = async (jwt,where) =>{
    try{
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl +'get-tiposcaso', where, config)
        return response.data
    }catch(error){
        console.error('Error al obtener los tipos de caso')
        throw error
    }
}
export default {getTiposDeCaso}