import axios from "axios";
import Constantes from "../js/Constantes";
import sessionData from '../js/sessionData'
const URI = Constantes.URI


const lanzarRobot = (jwt) =>{
    const config = {
        headers: {
            Authorization: jwt
        }
    };
    const request = axios.post(URI +'api/robots/preciosrobot', " ",config)
    return request.then(response => response.data)
}
const crearCaso = (jwt,argumentos) =>{
    const config = {
        headers: {
            Authorization: jwt
        }
    };
    const request = axios.post(URI +'api/robots/create-casos', argumentos, config)
    return request.then(response => response.data)
}
const conmutarRobot = (jwt,argumentos) =>{
    const config = {
        headers: {
            Authorization: jwt
        }
    };
    const request = axios.post(URI +'api/robots/conmutar', argumentos, config)
    return request.then(response => response.data)
}
const getConmutador = (jwt,argumentos) =>{
    const config = {
        headers: {
            Authorization: jwt
        }
    };
    const request = axios.post(URI +'api/robots/get-conmutador', argumentos, config)
    return request.then(response => response.data)
}
export default {lanzarRobot,crearCaso,conmutarRobot, getConmutador}