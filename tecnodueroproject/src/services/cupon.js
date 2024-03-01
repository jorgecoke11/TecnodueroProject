import axios from "axios";
import Constantes from '../js/Constantes.js';
import sessionData from '../js/sessionData';

const baseUrl = Constantes.URI + 'api/robots/cupones/get-cupones';
const config = {
    headers:{
        Authorization: sessionData.token
    }
}
const getCupones = async argumentos =>{
    try {
        const response = await axios.post(baseUrl, argumentos, config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener casos:', error);
        throw error; // Puedes relanzar el error para manejarlo en otro lugar si es necesario
    }
}
export default {getCupones}