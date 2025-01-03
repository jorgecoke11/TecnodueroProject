import axios from "axios";
import Constantes from '../js/Constantes.js';

const baseUrl = Constantes.URI + 'api/robots/ejecutables';

const getEjecutables = async(jwt, idProceso)=>{
    const config = {
        headers: {
            Authorization: jwt
        }
    }
    const response = await axios.post(baseUrl +'/get-ejecutables',idProceso,config)
    return response.data
}
const updateStatus = async(jwt, args)=>{
    const config = {
        headers: {
            Authorization: jwt
        }
    }
    const response = await axios.post(baseUrl +'/update-status',args,config)
    return response.data
}
const getEjecutable = async(jwt, args)=>{
    const config = {
        headers: {
            Authorization: jwt
        }
    }
    const response = await axios.post( baseUrl + '/get-ejecutable-generico', args, config)
    return response.data
}
const deleteEjecutable = async(jwt, args)=>{
    const config = {
        headers:{
            Authorization: jwt
        }
    }
    const response = await axios.post(baseUrl + '/delete-ejecutable', args, config)
    return response.data
}
const createEjecutable = async(jwt, args)=>{
    const config = {
        headers:{
            Authorization: jwt
        }
    }
    const response = await axios.post(baseUrl + '/create-ejecutable', args, config)
    return response.data
}
const updateEjecutable = async(jwt, args)=>{
    const config = {
        headers:{
            Authorization: jwt
        }
    }
    const response = await axios.post(baseUrl + '/update-ejecutable', args, config)
    return response.data
}

export default {getEjecutables, updateStatus,getEjecutable, deleteEjecutable,createEjecutable, updateEjecutable}