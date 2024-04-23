import jwt from 'jsonwebtoken';
import express, { response } from 'express';
import { execFile } from 'child_process';
import { execPath } from 'process';
import casosModel from '../models/casosModel.js';
import maquinasModel from '../models/maquinasModel.js'
import Utils from './Utils.js'
import { INTEGER, Sequelize } from 'sequelize';
import tipoCasoModel from '../models/tipoCasoModel.js';
const atributos = ['idCaso', 'idEstadoFK', 'idRobotFK', 'nombre', 'porcentaje', 'datos']
const maquinasCalls = express.Router();

maquinasCalls.post('/get-maquinas',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        const response = await maquinasModel.findAll({
        })
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
maquinasCalls.post('/update-status', async(req,res)=>{
    try{
        Utils.checkToken(req,res)
        const status= {status: req.body.status}
        console.log(req.body)
        const response = await maquinasModel.update( status,{
            where: {id: req.body.criterio}
        }
    )
    res.status(200).json(response)
    }catch(error){
        //console.log(error)
    }
})
export default maquinasCalls
