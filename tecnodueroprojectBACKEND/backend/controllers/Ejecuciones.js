
import express, { response } from 'express';
import ejecucionesModel from '../models/ejecucionesModels.js'
import Utils from './Utils.js'
import estadosEjecucionModel from '../models/estadosEjecucion.js'
import ejecutablesModel from '../models/ejecutablesModel.js'
const EjecucionesCalls = express.Router();

EjecucionesCalls.post('/get-ejecucion-caso',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        ejecucionesModel.belongsTo(estadosEjecucionModel, { foreignKey: 'id_estado_fk', targetKey: 'id_estado' });
        ejecucionesModel.belongsTo(ejecutablesModel, { foreignKey: 'id_ejecutable_fk', targetKey: 'id' });
        const response = await ejecucionesModel.findAll({
            where:{
                id_caso_fk: req.body.id_caso_fk
            },
            order: [['fh_inicio', 'ASC']],
            include:[ {
                model: estadosEjecucionModel,
                attributes: ['nombre'],
              },
            {
                model: ejecutablesModel,
                attributes: ['nombre'],
            }
            ]
        })
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
EjecucionesCalls.post('/create-ejecucion',async(req,res)=>{
    try{

        Utils.checkToken(req, res)
        const response = await ejecucionesModel.create({
            id_caso_fk: req.body.id_caso_fk,
            id_ejecutable_fk: req.body.id_ejecutable_fk,
            id_estado_fk: req.body.id_estado_fk
        })
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
EjecucionesCalls.post('/update-generico', async (req, res) => {

    Utils.checkToken(req, res);
    const nuevosDatos = req.body.nuevosDatos
    const criterio = req.body.criterio
    try {
      const resultado = await ejecucionesModel.update(nuevosDatos, {
          where: criterio
      });
      
      console.log(resultado)
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Error al actualizar el caso:', error);
      return res.status(500).send({ "message": "Error al actualizar el caso" });
    }
});
EjecucionesCalls.post('/revivir-ultima-ejecucion', async (req, res) => {

    Utils.checkToken(req, res);
    try {
    const ultimaEjecucion = await ejecucionesModel.findOne({
        where: { id_caso_fk: req.body.id_caso_fk },
        order: [['fh_inicio', 'DESC']],
      });  
      if (ultimaEjecucion) { 
        await ejecucionesModel.update(
            { id_estado_fk: req.body.id_estado_fk }, // Lo que queremos actualizar
            { where: { id: ultimaEjecucion.id } } // Condición de actualización
          );
      } 
      res.status(200).json(ultimaEjecucion);
    } catch (error) {
      console.error('Error al actualizar el caso:', error);
      return res.status(500).send({ "message": "Error al actualizar el caso" });
    }
});
EjecucionesCalls.post('/get-ejecucion-by-estado',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        const response = await ejecucionesModel.findAll({
            where:{
                id_estado_fk: req.body.id_estado
            }
        })
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
EjecucionesCalls.post('/get-ejecucion-generico',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        console.log(req.body)
        const response = await ejecucionesModel.findOne({
            where: req.body.whereGenerico    
        })
        res.json(response)
    }catch(error){
        console.log(error)
    }
})
export default EjecucionesCalls
