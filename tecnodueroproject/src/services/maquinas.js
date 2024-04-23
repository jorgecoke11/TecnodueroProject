import axios from "axios";
import Constantes from '../js/Constantes.js';

const baseUrl = Constantes.URI + 'api/robots/maquinas';

const getMaquinas = async(jwt)=>{
    const config = {
        headers: {
            Authorization: jwt
        }
    }
    const response = await axios.post(baseUrl +'/get-maquinas',"",config)
    return response.data
}
const update = async(jwt, argumentos)=>{
    const config = {
        headers: {
            Authorization: jwt
        }
    }
    const response = await axios.post(baseUrl + '/update-status',argumentos,config)
    return response.data
}
export default {getMaquinas, update}