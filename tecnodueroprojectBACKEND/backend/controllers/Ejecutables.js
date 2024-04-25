import jwt from 'jsonwebtoken';
import express, { response } from 'express';
import { execFile } from 'child_process';
import { execPath } from 'process';
import casosModel from '../models/casosModel.js';
import ejecutablesModel from '../models/ejecutablesModel.js'
import Utils from './Utils.js'
import { INTEGER, Sequelize } from 'sequelize';
import tipoCasoModel from '../models/tipoCasoModel.js';
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
