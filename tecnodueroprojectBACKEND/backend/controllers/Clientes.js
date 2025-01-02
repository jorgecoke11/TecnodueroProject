
import express, { response } from 'express';
import Utils from './Utils.js'
import { Op } from 'sequelize';
import clientesModel from '../models/clientesModel.js';
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
clientesCalls.post('/create-cliente',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        const datosCliente = req.body.cliente
        const response = await clientesModel.create(datosCliente, {
            fields: ['nombre', 'apellidos', 'telefono', 'email', 'email',  'nif']
          });
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
clientesCalls.post('/get-cliente',async(req, res)=>{
    try{    
        Utils.checkToken(req,res)
        const conditions = req.body
        const whereClause = {};
        for (const key in conditions) {
            if (Object.hasOwnProperty.call(conditions, key)) {
                whereClause[key] = {
                    [Op.like]: `%${conditions[key]}%`
                };
            }
        }
        const response = await clientesModel.findAll({
            where: whereClause
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
        console.log(nuevosDatos)
        console.log(criterio)
        const resultado = await clientesModel.update(nuevosDatos, {
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
        const response = await clientesModel.destroy({
            where: { id: clienteId }
        });
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
export default clientesCalls
