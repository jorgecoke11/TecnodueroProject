import jwt from 'jsonwebtoken';
import express from 'express';
import cuponesModel from '../models/cuponesModel.js'
const cuponesCalls = express.Router();
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
  cuponesCalls.post('/get-cupones', async (req, res) => {
    try {
        // Ejecutar la actualización
        checkToken(req, res);
        const body = req.body;
        console.log(body);
        const resultado = await cuponesModel.findOne({
          attributes: ['id', 'nombre', 'cupon'],
          where: { nombre: body.nombre }
      });
        res.json(resultado)
    } catch (error) {
        console.error('Error al obtener casos disponibles', error);
        return res.status(500).json({ "message": "Error al obtener casos disponibles" });
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
        return res.status(500).json({ "message": "Error al obtener casos disponibles" });
    }
  });
  export default cuponesCalls