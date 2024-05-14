import express from 'express';
import Utils from './Utils.js';
import direccionesModel from '../models/direccionesModel.js';
import clientesModel from '../models/clientesModel.js'
import { INTEGER, Sequelize } from 'sequelize';
const direccionesCalls = express.Router();

direccionesCalls.post('/get-direcciones', async (req, res) => {
    try {
        Utils.checkToken(req, res);
        direccionesModel.belongsTo(clientesModel, { foreignKey: 'id_cliente', targetKey: 'id' });
        const response = await direccionesModel.findAll({
            attributes: [
                [Sequelize.literal('direcciones.id'), 'id'],
                [Sequelize.literal('cliente.nombre'), 'nombre'],
                [Sequelize.literal('cliente.apellidos'), 'apellidos'],
                [Sequelize.literal('direcciones.calle'), 'calle'],
                [Sequelize.literal('direcciones.ciudad'), 'ciudad'],
                [Sequelize.literal('direcciones.provincia'), 'provincia'],
                [Sequelize.literal('direcciones.cod_postal'), 'cod_postal'],
              ],
              include: {
                model: clientesModel,
                attributes: [],
              }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
});
direccionesCalls.post('/create-direccion',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        const datosDireccion = req.body.direccion
        console.log(datosDireccion)
        const response = await direccionesModel.create(datosDireccion, {
            fields: ['id_cliente', 'calle', 'ciudad', 'provincia', 'cod_postal']
          });
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
direccionesCalls.post('/get-direccion', async (req, res) => {
    try {
        Utils.checkToken(req, res);
        direccionesModel.belongsTo(clientesModel, { foreignKey: 'id_cliente', targetKey: 'id' });
        const response = await direccionesModel.findAll({
            attributes: [
                [Sequelize.literal('cliente.nombre'), 'nombre'],
                [Sequelize.literal('cliente.apellidos'), 'apellidos'],
                [Sequelize.literal('direcciones.calle'), 'calle'],
                [Sequelize.literal('direcciones.ciudad'), 'ciudad'],
                [Sequelize.literal('direcciones.provincia'), 'provincia'],
                [Sequelize.literal('direcciones.cod_postal'), 'cod_postal']
              ],
              include: {
                model: clientesModel,
                attributes: [],
              },
              where: {
                id: req.body.idDireccion
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error);

    }
});

direccionesCalls.post('/update-direccion', async (req, res) => {
    try {
        Utils.checkToken(req, res);
        const nuevosDatos = req.body.nuevosDatos;
        const criterio = req.body.criterio;
        const resultado = await direccionesModel.update(nuevosDatos, {
            where: criterio
        });
        res.status(200).json(resultado);
    } catch (error) {
        console.log(error);

    }
});

direccionesCalls.post('/delete-direccion', async (req, res) => {
    try {
        Utils.checkToken(req, res);
        const direccionId = req.body.direccionId;
        await direccionesModel.destroy({
            where: { id: direccionId }
        });
        res.status(200).json({ message: 'Dirección eliminada exitosamente' });
    } catch (error) {
        console.log(error);

    }
});

export default direccionesCalls;
