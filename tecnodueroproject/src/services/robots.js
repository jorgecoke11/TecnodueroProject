import axios from "axios";
import Constantes from "../js/Constantes";
import sessionData from '../js/sessionData'
const URI = Constantes.URI

const lanzarRobot = robotName =>{
    const config = {
        headers:{
            Authorization: sessionData.token
        }
    }
    const request = axios.put(`${URI}/${robotName}`, robotName, config)
    return request.then(response => response.data)
}


export default {setToken, lanzarRobot}