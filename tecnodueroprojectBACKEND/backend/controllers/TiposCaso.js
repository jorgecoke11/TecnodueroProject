import jwt from 'jsonwebtoken';
import express from 'express';
import tipoCasoModel from '../models/tipoCasoModel.js';
const atributos = ['idtipo', 'nombre', 'id_proceso']
const tiposCasoCalls = express.Router();
function checkToken(req, res){
    try{
      const token = req.get('authorization')?.split(' ')[1]; // Obtener token del encabezado
      if (!token) {
          return res.status(401).json({ error: 'Token missing' });
      }
    
      const decodedToken = jwt.verify(token, process.env.CLAVE_SECRETA);
      if (!decodedToken) {
          return res.status(401).json({ error: 'Invalid token' });
      }
    }catch(error){
  
    }
}
tiposCasoCalls.post('/get-tiposcaso', async(req, res)=>{
    try{
        const body = req.body
        console.log(body)
        checkToken(req,res)
        const response = await tipoCasoModel.findAll({
            where:{
                id_proceso: body.id_proceso
            }
        })
        res.json(response)
    }catch(error){
        console.log(error)
        res.status(500).json({ message: error.message });
    }
})
export default tiposCasoCalls
