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
        const response = await ejecutablesModel.findAll({
        })
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
export default ejecutablesCalls
