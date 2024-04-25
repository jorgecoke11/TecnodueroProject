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
export default { getProcesos, updateConmutador}