import axios from "axios";
import Constantes from '../js/Constantes.js'

const baseUrl = Constantes.URI + 'api/login/'
const login = async credentials =>{
    const {data}= await axios.post(baseUrl, credentials)
    return data
}
export default {login}