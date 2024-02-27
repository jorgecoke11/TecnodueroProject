import jwt from 'jsonwebtoken';
import express from 'express';
import { execFile } from 'child_process';
import { execPath } from 'process';
import robotPreciosModel from '../models/robotPreciosModel.js';
const scriptPrecios = express.Router();

scriptPrecios.post('/preciosrobot', async (req, res) => {
    let decodedToken = {}
    try {
        const authorization = req.get('authorization')
        const  argumentos  =req.body;
        let token = ''
        const args = [
            argumentos.proveedor,
            argumentos.iva,
            argumentos.beneficio,
            argumentos.cupon,
            ...argumentos.producto // Si producto es un array, se agregan sus elementos como argumentos individuales
          ];
          console.log(args)
        if(authorization && authorization.toLowerCase().startsWith('bearer')){
            token = authorization.substring(7)
        }

        try {
            decodedToken = jwt.verify(token, process.env.CLAVE_SECRETA)
            let path = process.env.PATH_ROBOT_PRECIOS
            console.log(path)

            if (!argumentos) {
                return res.status(400).json({ error: 'Se requieren los argumentos' });
            }

            // Lanzar el programa .exe con los argumentos
            const { stdout, stderr } = await new Promise((resolve, reject) => {
                execFile(path, args, (error, stdout, stderr) => {
                    if (error) {
                        console.error('Error al ejecutar el programa:', error);
                        reject(error);
                    } else {
                        console.log('stdout:', stdout);
                        console.error('stderr:', stderr);
                        resolve({ stdout, stderr });
                    }
                });
            });

            res.status(200).json({ stdout, stderr });
        } catch (error) {
            return res.status(500).json({ error: 'Error al ejecutar el programa' });
        }

        if(!token || !decodedToken){
            return res.status(401).json({
                error:'token missing or invalid'
            })
        }

    } catch (error) {
        res.json( {message: error.message} )
    }
})
scriptPrecios.post('/conmutar', async (req, res) => {
    try{
        checkToken(req, res)
        const respuesta = await robotPreciosModel.update(
            {conmutador: req.body.conmutador},
            {where:{idRobot: req.body.idRobot}}
        )
        res.status(200).json({"message:": "Conmutador actualizado"})
    } catch (error) {
        res.json( {message: error.message} )
    }
})
scriptPrecios.post('/get-conmutador', async (req, res) => {
    try{
        checkToken(req, res)

        const respuesta = await robotPreciosModel.findOne({
            attributes:['conmutador'],
            where:{idRobot: req.body.idRobot}
        })
        
        res.status(200).json(respuesta)
    } catch (error) {
        res.json( {message: error.message} )
    }
})
function checkToken(req, res){
    const token = req.get('authorization')?.split(' ')[1]; // Obtener token del encabezado
    if (!token) {
        return res.status(401).json({ error: 'Token missing' });
    }
  
    const decodedToken = jwt.verify(token, process.env.CLAVE_SECRETA);
    if (!decodedToken) {
        return res.status(401).json({ error: 'Invalid token' });
    }
  }
export default scriptPrecios;
