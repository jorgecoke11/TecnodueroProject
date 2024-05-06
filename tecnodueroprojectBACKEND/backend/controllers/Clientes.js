
import express, { response } from 'express';
import Utils from './Utils.js'
import { INTEGER, Sequelize } from 'sequelize';
import clientesModel from '../models/clientesModel.js';
import casosModel from '../models/casosModel.js';
const atributos = ['idCaso', 'idEstadoFK', 'idRobotFK', 'nombre', 'porcentaje', 'datos']
const clientesCalls = express.Router();

clientesCalls.post('/get-clientes',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        const response = await clientesModel.findAll({
        })
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
clientesCalls.post('/get-cliente',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        const response = await clientesModel.findAll({
            where:{
                id: req.body.idCliente
            }
        })
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
clientesCalls.post('/update-cliente',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        const nuevosDatos = req.body.nuevosDatos
        const criterio = req.body.criterio
        const resultado = await casosModel.update(nuevosDatos, {
            where: criterio
        });
        res.status(200).json(resultado)
    }catch(error){
        console.log(error)
    }
})
clientesCalls.post('/delete-cliente',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        const clienteId = req.body.clienteId
        await clientesModel.destroy({
            where: { id: clienteId }
        });
        res.status(200).json(resultado)
    }catch(error){
        console.log(error)
    }
})
export default clientesCalls
