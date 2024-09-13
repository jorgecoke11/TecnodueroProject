
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
            id_caso_fk: req.body.idCaso,
            id_bloque: req.body.idBloque,
            id_estado: req.body.idEstado,
            fh_inicio: req.body.fh_inicio,
            fh_fin: req.body.fh_fin
        })
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
EjecucionesCalls.post('/update-generico', async (req, res) => {

    checkToken(req, res);
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
export default EjecucionesCalls
