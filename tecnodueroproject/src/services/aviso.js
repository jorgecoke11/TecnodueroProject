import axios from "axios";
import Constantes from '../js/Constantes.js';

const baseUrl = Constantes.URI + 'api/avisos/avisos';

const getAvisos = async (jwt, where) => {
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl + '/get-avisos', where, config); // Assuming post request needs an empty body
        return response.data; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error('Error fetching clientes:', error.message); // Logging the error message for better debugging
        throw error; // Re-throwing the error to handle it in the component
    }
}
const deleteAviso = async (jwt, where) =>{
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl + '/delete-aviso', where, config); // Assuming post request needs an empty body
        return response.data; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error('Error fetching clientes:', error.message); // Logging the error message for better debugging
        throw error; // Re-throwing the error to handle it in the component
    }
}
const getAvisoConditions = async (jwt, where) => {
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl + '/get-aviso', where, config); // Assuming post request needs an empty body
        return response.data; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error('Error fetching clientes:', error.message); // Logging the error message for better debugging
        throw error; // Re-throwing the error to handle it in the component
    }
}
const updateAviso = async (jwt,where) => {
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl + '/update-aviso', where, config); // Assuming post request needs an empty body
        return response.data; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error('Error fetching clientes:', error.message); // Logging the error message for better debugging
        throw error; // Re-throwing the error to handle it in the component
    }
}
const createAviso = async (jwt,where) => {
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl + '/create-aviso', where, config); // Assuming post request needs an empty body
        return response.data; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error('Error fetching clientes:', error.message); // Logging the error message for better debugging
        throw error; // Re-throwing the error to handle it in the component
    }
}

export default {getAvisos, updateAviso, createAviso, getAvisoConditions, deleteAviso};
