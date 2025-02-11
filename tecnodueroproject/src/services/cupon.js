import axios from "axios";
import Constantes from '../js/Constantes.js';
import sessionData from '../js/sessionData';

const baseUrl = Constantes.URI + 'api/robots/cupones/get-cupones';

const getCupones = async (jwt,argumentos) =>{
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };

        const response = await axios.post(baseUrl, argumentos, config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener casos:', error);
        throw error; // Puedes relanzar el error para manejarlo en otro lugar si es necesario
    }
}
const updateCupon = async (jwt,argumentos) =>{
    try{
        const config = {
            headers: {
                Authorization: jwt
            }
        };

        const response = await axios.post(Constantes.URI + 'api/robots/cupones/update-cupones', argumentos, config)
        return response.data
    }catch(error){
        throw error
    }
}
export default {getCupones, updateCupon}