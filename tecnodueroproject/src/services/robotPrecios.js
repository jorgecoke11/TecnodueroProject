import axios from "axios";
import Constantes from "../js/Constantes";
import sessionData from '../js/sessionData'
const URI = Constantes.URI

const lanzarRobot = argumentos =>{
    const config = {
        headers:{
            Authorization: sessionData.token
        }
    }
    const request = axios.post(URI +'api/robots/preciosrobot', argumentos, config)
    return request.then(response => response.data)
}


export default {lanzarRobot}