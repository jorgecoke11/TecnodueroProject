import jwt from 'jsonwebtoken';
import express from 'express';
import { execFile } from 'child_process';
import { execPath } from 'process';
import estadosModel from '../models/estadosModel.js';
const atributos = ['idEstado', 'Nombre', 'final']
const estadosCalls = express.Router();

estadosCalls.post('/create-estados', async (req, res) => {
    try {
        const {...estado} = req.body
        console.log(estado)
        await estadosModel.create(estado,{
            fields: atributos,
        })
        res.json({
            "message": "estado creado correctamente"
        })
    } catch (error) {
       
    }
})

export default estadosCalls;
