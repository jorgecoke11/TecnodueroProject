import jwt from 'jsonwebtoken';
import express from 'express';
import cuponesModel from '../models/cuponesModel.js'
const cuponesCalls = express.Router();
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
  cuponesCalls.post('/get-cupones', async (req, res) => {
    try {
        // Ejecutar la actualización
       await checkToken(req, res);
        const body = req.body;
        console.log(body);
        const resultado = await cuponesModel.findOne({
          attributes: ['id', 'nombre', 'cupon'],
          where: { nombre: body.nombre }
      });
        res.json(resultado)
    } catch (error) {
      console.log(error)
    }
  });
  cuponesCalls.post('/update-cupones', async (req, res) => {
    try {
        // Ejecutar la actualización
        checkToken(req, res);
        const body = req.body;
        console.log(body);
        const resultado = await cuponesModel.update(
          { cupon:body.cuponBD }, // Nuevos valores a actualizar
          { where: { nombre: body.nombre } } // Condición para seleccionar el caso a actualizar
      );
        res.json(resultado)
    } catch (error) {
        console.error('Error al obtener casos disponibles', error);
        
    }
  });
  export default cuponesCalls