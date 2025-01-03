import axios from "axios";
import Constantes from '../js/Constantes.js';
import sessionData from '../js/sessionData';

const baseUrl = Constantes.URI + 'api/parametros';

const getParametros = async (jwt,argumentos) =>{
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };

        const response = await axios.post(baseUrl + '/get-parametros', argumentos, config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener casos:', error);
        throw error; // Puedes relanzar el error para manejarlo en otro lugar si es necesario
    }
}
const getParametro = async (jwt,argumentos) =>{
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };

        const response = await axios.post(baseUrl + '/get-parametro-generico', argumentos, config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener casos:', error);
        throw error; // Puedes relanzar el error para manejarlo en otro lugar si es necesario
    }
}
const updateParametro = async (jwt,argumentos) =>{
    try{
        const config = {
            headers: {
                Authorization: jwt
            }
        };

        const response = await axios.post(baseUrl + '/update-valor', argumentos, config)
        return response.data
    }catch(error){
        throw error
    }
}
export default {getParametros, updateParametro, getParametro}