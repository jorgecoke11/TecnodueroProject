import jwt from 'jsonwebtoken';
import express from 'express';
import { execFile } from 'child_process';
import { execPath } from 'process';
import robotPreciosModel from '../models/robotPreciosModel.js';
import psList from 'ps-list'
const scriptPrecios = express.Router();
scriptPrecios.post('/preciosrobot', async (req, res) => {
    try {
        const token = req.get('Authorization')?.split(' ')[1]; // Obtener token del encabezado

        if (!token) {
            return res.status(401).json({ error: 'Token missing' });
        }

        const decodedToken = jwt.verify(token, process.env.CLAVE_SECRETA);
        if (!decodedToken) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        let path = process.env.PATH_ROBOT_PRECIOS_PC5;
        const processToCheck = 'Precios2023.exe';

        const processes = await psList();
        const matchingProcesses = processes.filter(process => process.name === processToCheck);
      
        if (matchingProcesses.length > 0) {
            console.log(`El proceso ${processToCheck} está en ejecución.`);
            // Obtener el ID del primer proceso coincidente (asumiendo que solo habrá uno)
            const processId = matchingProcesses[0].pid;
            process.kill(processId);
            console.log(`Proceso ${processToCheck} terminado.`);

            // Ejecutar el programa en segundo plano
            ejecutarPrograma(path);
            
            // Esperar hasta que el proceso anterior esté completamente terminado
            await waitForProcessToTerminate(processToCheck);

            // El proceso anterior ha sido completamente terminado, ahora podemos responder al cliente
            res.status(200).json({ message: 'Proceso terminado y programa ejecutado correctamente.' });
        } else {
            console.log(`El proceso ${processToCheck} no está en ejecución.`);
            // Si el proceso no está en ejecución, simplemente ejecutamos el programa
            await ejecutarPrograma(path);
            res.status(200).json({ message: 'Programa ejecutado correctamente.' });
        }

    } catch (error) {
        console.error('Error al ejecutar el programa:', error);
        res.status(500).json({ error: 'Error al ejecutar el programa' });
    }
});

async function waitForProcessToTerminate(processToCheck) {
    return new Promise(resolve => {
        const intervalId = setInterval(async () => {
            const processes = await psList();
            const matchingProcesses = processes.filter(process => process.name === processToCheck);
            if (matchingProcesses.length === 0) {
                clearInterval(intervalId);
                resolve();
            }
        }, 1000);
    });
}

function ejecutarPrograma(path) {
    execFile(path, (error, stdout, stderr) => {
        if (error) {
            console.error('Error al ejecutar el programa:', error);
            return;
        }
        console.log('Programa ejecutado correctamente.');
    });
}

scriptPrecios.post('/conmutar', async (req, res) => {
    try{
        checkToken(req, res)
        const respuesta = await robotPreciosModel.update(
            {conmutador: req.body.conmutador},
            {where:{idRobot: req.body.idRobot}}
        )
        res.status(200).json({"message:": "Conmutador actualizado"})
    } catch (error) {
        console.log(error)
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
        console.log(error)
    }
})
function checkToken(req, res){
    try{

        const token = req.get('authorization')?.split(' ')[1]; // Obtener token del encabezado
        if (!token) {
            return res.status(401).json({ error: 'Token missing' });
        }
  
        const decodedToken = jwt.verify(token, process.env.CLAVE_SECRETA);
        if (!decodedToken) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }catch(error){
       
    }
}

export default scriptPrecios;
