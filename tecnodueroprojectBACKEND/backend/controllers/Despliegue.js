import express from 'express';
import despliegueModel from '../models/despliegueModel.js'
import ejecutablesModel from '../models/ejecutablesModel.js';
import robotsModel from '../models/robotPreciosModel.js'
import Utils from './Utils.js'
import { Sequelize } from 'sequelize';
const atributos = ['idCaso', 'idEstadoFK', 'idRobotFK', 'nombre', 'porcentaje', 'datos']
const desplieguesCalls = express.Router();

desplieguesCalls.post('/get-despliegues', async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        const idRobot = req.body.id_robot.fk
        const response = despliegueModel.findAll({
            where:{
                id_robot_fk: idRobot
            }
        })
        res.status(200).json(response);
    }catch(error){ 
        res.status(500).json({message:"se ha producido un error " + error})
        console.log(error)
    }
})
desplieguesCalls.post('/get-ejecutables-despliegue', async (req, res) => {
    try {
        Utils.checkToken(req, res);
        const nombre = req.body.nombre;

        if (!nombre) {
            return res.status(400).json({ message: "El campo 'nombre' es requerido." });
        }

        // Definir las relaciones
        despliegueModel.belongsTo(ejecutablesModel, { foreignKey: 'id_ejecutable_fk', targetKey: 'id' });
        ejecutablesModel.belongsTo(robotsModel, { foreignKey: 'id_robot_fk', targetKey: 'idRobot' });

        const response = await despliegueModel.findAll({
            where: {
                nombre: nombre 
            },
            include: [
                {
                    model: ejecutablesModel,
                    required: true,
                    include: [
                        {
                            model: robotsModel, // Incluir robots a través de ejecutables
                            required: true
                        }
                    ]
                }
            ],
            group: ['despliegue.id']
        });


            return res.status(200).json(response);
        
    } catch (error) {
        res.status(500).json({ message: "Se ha producido un error: " + error.message });
        console.error("Error en /get-ejecutables-despliegue:", error); // Mejorar el registro de errores
    }
});
desplieguesCalls.post('/get-despliegue',async(req,res)=>{
    try{
        Utils.checkToken(req,res)
        console.log(req.body.generico)
        const response = await despliegueModel.findOne({
            where: req.body.generico
        })
        return res.status(200).json(response)
    }catch(error){
        res.status(500).json({message:"Error al obtener el conmutador del despliegue "+ error})
    }
})
desplieguesCalls.post('/update-generico',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        console.log(req.body)
        const response = await despliegueModel.update( req.body.nuevosDatos,{
            where: req.body.criterio
        })
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
export default desplieguesCalls
