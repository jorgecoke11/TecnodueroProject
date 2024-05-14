import axios from "axios";
import Constantes from '../js/Constantes.js';

const baseUrl = Constantes.URI + 'api/avisos/clientes';

const getClientes = async (jwt) => {
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl + '/get-clientes', {}, config); // Assuming post request needs an empty body
        return response.data; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error('Error fetching clientes:', error.message); // Logging the error message for better debugging
        throw error; // Re-throwing the error to handle it in the component
    }
}
const deleteCliente = async (jwt, where) =>{
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl + '/delete-cliente', where, config); // Assuming post request needs an empty body
        return response.data; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error('Error fetching clientes:', error.message); // Logging the error message for better debugging
        throw error; // Re-throwing the error to handle it in the component
    }
}
const getClientsConditions = async (jwt, where) => {
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl + '/get-cliente', where, config); // Assuming post request needs an empty body
        return response.data; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error('Error fetching clientes:', error.message); // Logging the error message for better debugging
        throw error; // Re-throwing the error to handle it in the component
    }
}
const updateCliente = async (jwt,where) => {
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl + '/update-cliente', where, config); // Assuming post request needs an empty body
        return response.data; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error('Error fetching clientes:', error.message); // Logging the error message for better debugging
        throw error; // Re-throwing the error to handle it in the component
    }
}
const createCliente = async (jwt,where) => {
    try {
        const config = {
            headers: {
                Authorization: jwt
            }
        };
        const response = await axios.post(baseUrl + '/create-cliente', where, config); // Assuming post request needs an empty body
        return response.data; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error('Error fetching clientes:', error.message); // Logging the error message for better debugging
        throw error; // Re-throwing the error to handle it in the component
    }
}

export default {getClientes, updateCliente, createCliente, getClientsConditions, deleteCliente};
