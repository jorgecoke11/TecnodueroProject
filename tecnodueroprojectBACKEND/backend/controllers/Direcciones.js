import express from 'express';
import Utils from './Utils.js';
import direccionesModel from '../models/direccionesModel.js';

const direccionesCalls = express.Router();

direccionesCalls.post('/get-direcciones', async (req, res) => {
    try {
        Utils.checkToken(req, res);
        const response = await direccionesModel.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);

    }
});

direccionesCalls.post('/get-direccion', async (req, res) => {
    try {
        Utils.checkToken(req, res);
        const response = await direccionesModel.findAll({
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
