import axios from "axios";
import Constantes from "../js/Constantes";
const URI = Constantes.URI

const getProcesos = (jwt)=>{
    const config = {
        headers: {
            Authorization: jwt
        }
    };
    const request = axios.post(URI +'api/procesos/get-procesos',"",config)
    return request.then(response => response.data)
}
const getProceso = (jwt, args)=>{
    const config = {
        headers: {
            Authorization: jwt
        }
    };
    const request = axios.post(URI +'api/procesos/get-proceso',args,config)
    return request.then(response => response.data)
}
const updateConmutador = (jwt, args)=>{
    const config = {
        headers: {
            Authorization: jwt
        }
    };
    const request = axios.post(URI +'api/procesos/update-conmutador',args,config)
    return request.then(response => response.data)
}
const updateProceso = (jwt, args)=>{
    const config = {
        headers: {
            Authorization: jwt
        }
    };
    const request = axios.post(URI +'api/procesos/update-proceso',args,config)
    return request.then(response => response.data)
}
const createProceso = async(jwt, args)=>{
    const config = {
        headers: {
            Authorization: jwt
        }
    };
    const request = await axios.post(URI +'api/procesos/create-proceso',args,config)
    return request.data
}
const deleteProceso = async(jwt, args)=>{
    const config = {
        headers: {
            Authorization: jwt
        }
    };
    const request = await axios.post(URI +'api/procesos/delete-proceso',args,config)
    return request.data
}
export default { getProcesos, updateConmutador, getProceso, updateProceso,createProceso, deleteProceso}