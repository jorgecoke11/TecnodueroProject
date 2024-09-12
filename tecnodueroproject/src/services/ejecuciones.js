import axios from "axios";
import Constantes from '../js/Constantes.js';

const baseUrl = Constantes.URI + 'api/robots/ejecuciones';

const getEjecuciones = async(jwt, id_caso_fk)=>{
    const config = {
        headers: {
            Authorization: jwt
        }
    }
    const response = await axios.post(baseUrl +'/get-ejecucion-caso',id_caso_fk,config)
    return response.data
}
const createEjecucion = async(jwt, args)=>{
    const config = {
        headers: {
            Authorization: jwt
        }
    }
    const response = await axios.post(baseUrl +'/create-ejecucion',args,config)
    return response.data
} 

export default {getEjecuciones, createEjecucion}