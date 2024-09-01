import jwt from 'jsonwebtoken';
import express, { response } from 'express';
import { execFile } from 'child_process';
import { execPath } from 'process';
import casosModel from '../models/casosModel.js';
import ejecucionesModel from '../models/ejecucionesModels.js'
import Utils from './Utils.js'
import { INTEGER, Sequelize } from 'sequelize';
import tipoCasoModel from '../models/tipoCasoModel.js';
const atributos = ['idCaso', 'idEstadoFK', 'idRobotFK', 'nombre', 'porcentaje', 'datos']
const EjecucionesCalls = express.Router();

EjecucionesCalls.post('/get-ejecucion-caso',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        console.log(req.body)
        const response = await ejecucionesModel.findAll({
            where:{
                id_caso_fk: req.body.idCaso
            }
        })
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
EjecucionesCalls.post('create-ejecucion'),async(req,res)=>{
    try{

        Utils.checkToken(req, res)
        const response = await ejecucionesModel.create({
            id_caso_fk: req.body.idCaso,
            id_bloque: req.body.idBloque
        })
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
}

EjecucionesCalls.post('/update-status',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        const status= {status: req.body.status}
        console.log(req.body)
        const response = await ejecucionesModel.update( status,{
            where: {nombre: req.body.criterio}
        })
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
export default ejecutablesCalls
