import axios from "axios";
import Constantes from '../js/Constantes.js';

const baseUrl = Constantes.URI + 'api/avisos/direcciones';

const getDirecciones = async (jwt) => {
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl + '/get-direcciones', {}, config); // Assuming post request needs an empty body
        return response.data; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error('Error fetching clientes:', error.message); // Logging the error message for better debugging
        throw error; // Re-throwing the error to handle it in the component
    }
}
const deleteDireccion = async (jwt, where) => {
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl + '/delete-direccion', where, config); // Assuming post request needs an empty body
        return response.data; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error('Error fetching clientes:', error.message); // Logging the error message for better debugging
        throw error; // Re-throwing the error to handle it in the component
    }
}
const getDireccionConditions = async (jwt, where) => {
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl + '/get-direccion', where, config); // Assuming post request needs an empty body
        return response.data; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error('Error fetching clientes:', error.message); // Logging the error message for better debugging
        throw error; // Re-throwing the error to handle it in the component
    }
}
const getDireccionesPorId = async (jwt, where) => {
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl + '/get-direcciones-id', where, config); // Assuming post request needs an empty body
        return response.data; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error('Error fetching clientes:', error.message); // Logging the error message for better debugging
        throw error; // Re-throwing the error to handle it in the component
    }
}
const updateDireccion = async (jwt, where) => {
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl + '/update-direccion', where, config); // Assuming post request needs an empty body
        return response.data; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error('Error fetching clientes:', error.message); // Logging the error message for better debugging
        throw error; // Re-throwing the error to handle it in the component
    }
}
const createDireccion = async (jwt, where) => {
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl + '/create-direccion', where, config); // Assuming post request needs an empty body
        return response.data; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error('Error fetching clientes:', error.message); // Logging the error message for better debugging
        throw error; // Re-throwing the error to handle it in the component
    }
}

export default { getDirecciones, updateDireccion, createDireccion, getDireccionConditions, deleteDireccion, getDireccionesPorId };
