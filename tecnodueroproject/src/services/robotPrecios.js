import axios from "axios";
import Constantes from "../js/Constantes";
const URI = Constantes.URI

const checkRobot = (jwt,nombre)=>{
    const config = {
        headers: {
            Authorization: jwt
        }
    };
    const request = axios.post(URI +'api/robots/check-bsh',nombre,config)
    return request.then(response => response.data)
}
const matarEjecutable = async(jwt, nombre) =>{
    const config = {
        headers: {
            Authorization: jwt
        }
    }
    const response = await axios.post(URI +'api/robots/matar-robot',nombre,config)
    return response.data
}
const lanzarEjecutable = async(jwt, nombre) =>{
    const config = {
        headers: {
            Authorization: jwt
        }
    }
    const response = await axios.post(URI +'api/robots/ejecutar-robot',nombre,config)
    return response.data
}
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
export default {lanzarRobot,crearCaso,conmutarRobot, getConmutador, checkRobot, matarEjecutable, lanzarEjecutable}