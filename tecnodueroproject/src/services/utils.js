import axios from "axios";
import Constantes from '../js/Constantes.js';
import sessionData from '../js/sessionData';
import { useUser } from "../hooks/useUser.js";

const baseUrl = Constantes.URI + 'api/utils';

const enviarEmail = async(jwt,where) =>{
    try{
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl+ '/send-email', where, config)
        return response
    }catch(error){
        console.error('Error al enviar email')
        throw error
    }
}
export default{enviarEmail}