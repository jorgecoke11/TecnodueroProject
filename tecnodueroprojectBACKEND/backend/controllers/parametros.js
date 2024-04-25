import jwt from 'jsonwebtoken';
import express from 'express';
import parametrosModel from '../models/parametrosModel.js'
const parametrosCalls = express.Router();
function checkToken(req, res){
  try{
    const token = req.get('authorization')?.split(' ')[1]; // Obtener token del encabezado
    if (!token) {
        return res.status(401).send({ error: 'Token missing' });
    }
  
    const decodedToken = jwt.verify(token, process.env.CLAVE_SECRETA);
    if (!decodedToken) {
        return res.status(401).send({ error: 'Invalid token' });
    }
    
  }catch(error){
    if (error.name === 'TokenExpiredError') {
      res.status(510).send({ error: 'Token expired. Please login again.' });
    } else {
      // Otros errores de JWT o de verificación de token
      console.error('Error al verificar el token:', error.message);
      return res.status(510).send({ error: 'Internal server error' });
    }
  }
  }
  parametrosCalls.post('/get-parametros', async (req, res) => {
    try {
        // Ejecutar la actualización
       await checkToken(req, res);
        const body = req.body;
        console.log(body);
        const resultado = await parametrosModel.findAll({
          where: { id_robot_fk: body.idRobot }
      });
        res.json(resultado)
    } catch (error) {
      console.log(error)
    }
  });
  parametrosCalls.post('/get-parametro', async (req, res) => {
    try {
        // Ejecutar la actualización
       await checkToken(req, res);
        const body = req.body;
        console.log(body);
        const resultado = await parametrosModel.findOne({
          attributes:['valor'],
          where: { codigo: body.codigo }
      });
        res.json(resultado)
    } catch (error) {
      console.log(error)
    }
  });
  parametrosCalls.post('/update-valor', async (req, res) => {
    try {
        // Ejecutar la actualización
        checkToken(req, res);
        const body = req.body;
        console.log(body);
        const resultado = await parametrosModel.update(
          { valor:body.valor }, // Nuevos valores a actualizar
          { where: { codigo: body.codigo } } // Condición para seleccionar el caso a actualizar
      );
        res.json(resultado)
    } catch (error) {
        console.error('Error al obtener casos disponibles', error);
        
    }
  });
  export default parametrosCalls
