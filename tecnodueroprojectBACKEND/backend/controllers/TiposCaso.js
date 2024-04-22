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
        if (error.name === 'TokenExpiredError') {
            res.status(510).send({ error: 'Token expired. Please login again.' });
          } else {
            // Otros errores de JWT o de verificación de token
            console.error('Error al verificar el token:', error.message);
            return res.status(500).send({ error: 'Internal server error' });
          }
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
    }
})
export default tiposCasoCalls
