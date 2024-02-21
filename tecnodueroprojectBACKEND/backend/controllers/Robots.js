import jwt from 'jsonwebtoken';
import express from 'express';
import { execFile } from 'child_process';
import { execPath } from 'process';

const scriptPrecios = express.Router();

scriptPrecios.post('/preciosrobot', async (req, res) => {
    let decodedToken = {}
    try {
        const authorization = req.get('authorization')
        const { argumentos } = req.body;
        console.log(argumentos)
        let token = ''

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
                execFile(path, argumentos, (error, stdout, stderr) => {
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

export default scriptPrecios;
