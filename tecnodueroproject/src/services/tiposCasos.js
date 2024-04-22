import axios from "axios";
import Constantes from '../js/Constantes.js';
import sessionData from '../js/sessionData';

const baseUrl = Constantes.URI + 'api/robots/tiposcaso/'

const config = {
    headers: {
        Authorization: sessionData.token
    }
};
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