import jwt from 'jsonwebtoken';
import express from 'express';
import procesosModel from '../models/procesosModel.js'
const procesosCalls = express.Router();
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
  procesosCalls.post('/get-procesos', async (req, res) => {
    try {
        // Ejecutar la actualización
       await checkToken(req, res);
        const resultado = await procesosModel.findAll({

      });
        res.json(resultado)
    } catch (error) {
      console.log(error)
    }
  });
  procesosCalls.post('/get-proceso', async (req, res) => {
    try {
        // Ejecutar la actualización
       await checkToken(req, res);
        const resultado = await procesosModel.findOne({
          where:{
            idRobot: req.body.idRobot
          }
      });
        res.json(resultado)
    } catch (error) {
      console.log(error)
    }
  });
  procesosCalls.post('/update-conmutador', async (req, res) => {
    try{
        checkToken(req, res)
        const respuesta = await procesosModel.update(
            {conmutador: req.body.conmutador},
            {where:{idRobot: req.body.idRobot}}
        )
        res.status(200).json({"message:": "Conmutador actualizado"})
    } catch (error) {
        console.log(error)
    }
})
procesosCalls.post('/update-proceso', async (req, res) => {
  try{
      checkToken(req, res)
      let nuevosDatos = req.body.nuevosDatos
      let criterio = req.body.criterio
      const respuesta = await procesosModel.update(nuevosDatos,
          {where: criterio}
      )
      res.status(200).json(respuesta)
  } catch (error) {
      console.log(error)
  }
})
procesosCalls.post('/delete-proceso', async (req, res) => {
  try{
      checkToken(req, res)
      const respuesta = await procesosModel.destroy(
          {where: req.body.whereGenerico}
      )
      res.status(200).json(respuesta)
  } catch (error) {
      console.log(error)
  }
})
procesosCalls.post('/create-proceso',async(req, res)=>{
    try{
        checkToken(req,res)
        let nuevosDatos = req.body.nuevosDatos
        console.log(req.body)
        const response = await procesosModel.create(nuevosDatos, {
            fields: ['Nombre']
          });
        res.status(200).json(response)
    }catch(error){
      console.log(error)
    }
})
  export default procesosCalls