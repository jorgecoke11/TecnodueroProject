import axios from "axios";
import Constantes from '../js/Constantes.js';
import sessionData from '../js/sessionData';
import { useUser } from "../hooks/useUser.js";

const baseUrl = Constantes.URI + 'api/robots/get-casos';

const updateEstado = async(jwt,where) =>{
    try{
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(Constantes.URI + 'api/robots/update-estado', where, config)
        return response
    }catch(error){
        console.error('Error al cambiar de estado el caso')
        throw error
    }
}
const getCasos = async (jwt,where) => {
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl, where, config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener casos:', error);
        throw error; // Puedes relanzar el error para manejarlo en otro lugar si es necesario
    }
};
const getCasosByIdEstado = async (jwt,where) => {
    const baseUrl = Constantes.URI + 'api/robots/get-casos-id-estado';
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl, where, config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener casos:', error);
        throw error; // Puedes relanzar el error para manejarlo en otro lugar si es necesario
    }
};
const getCasosFecha = async (jwt,where) => {

    const baseUrl = Constantes.URI + 'api/robots/get-casos-fecha';
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl, where, config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener casos:', error);
        throw error; // Puedes relanzar el error para manejarlo en otro lugar si es necesario
    }
};

export default { getCasos, getCasosByIdEstado, getCasosFecha,updateEstado };
