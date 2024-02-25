import axios from "axios";
import Constantes from '../js/Constantes.js';
import sessionData from '../js/sessionData';

const baseUrl = Constantes.URI + 'api/robots/get-casos';

const getCasos = async (where) => {
    const config = {
        headers: {
            Authorization: sessionData.token
        }
    };

    try {
        const response = await axios.post(baseUrl, where, config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener casos:', error);
        throw error; // Puedes relanzar el error para manejarlo en otro lugar si es necesario
    }
};
const getCasosByIdEstado = async (where) => {
    const config = {
        headers: {
            Authorization: sessionData.token
        }
    };
    const baseUrl = Constantes.URI + 'api/robots/get-casos-id-estado';
    try {
        const response = await axios.post(baseUrl, where, config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener casos:', error);
        throw error; // Puedes relanzar el error para manejarlo en otro lugar si es necesario
    }
};

export default { getCasos, getCasosByIdEstado };
