import express from 'express';
import ejecutablesModel from '../models/ejecutablesModel.js'
import Utils from './Utils.js'
const atributos = ['idCaso', 'idEstadoFK', 'idRobotFK', 'nombre', 'porcentaje', 'datos']
const ejecutablesCalls = express.Router();

ejecutablesCalls.post('/get-ejecutables',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        console.log(req.body)
        const response = await ejecutablesModel.findAll({
            where:{
                id_robot_fk: req.body.idRobot
            }
        })
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
ejecutablesCalls.post('/get-ejecutable-generico',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        console.log(req.body)
        const response = await ejecutablesModel.findOne({
            where: req.body.whereGenerico    
        })
        res.json(response)
    }catch(error){
        console.log(error)
    }
})
ejecutablesCalls.get('/get-all-ejecutables',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        console.log(req.body)
        const response = await ejecutablesModel.findAll();
        console.log(response)
        res.json(response)
    }catch(error){
        console.log(error)
    }
})
ejecutablesCalls.post('/update-status',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        const status= {status: req.body.status}
        console.log(req.body)
        const response = await ejecutablesModel.update( status,{
            where: {nombre: req.body.criterio}
        })
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
export default ejecutablesCalls
