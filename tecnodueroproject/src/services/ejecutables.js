import axios from "axios";
import Constantes from '../js/Constantes.js';

const baseUrl = Constantes.URI + 'api/robots/ejecutables';

const getEjecutables = async(jwt)=>{
    const config = {
        headers: {
            Authorization: jwt
        }
    }
    const response = await axios.post(baseUrl +'/get-ejecutables',"",config)
    return response.data
}
export default {getEjecutables}