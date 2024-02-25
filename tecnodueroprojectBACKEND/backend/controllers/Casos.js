import jwt from 'jsonwebtoken';
import express from 'express';
import { execFile } from 'child_process';
import { execPath } from 'process';
import casosModel from '../models/casosModel.js';
import estadosModel from '../models/estadosModel.js'
import { Sequelize } from 'sequelize';
const atributos = ['idCaso', 'idEstadoFK', 'idRobotFK', 'nombre', 'porcentaje', 'datos']
const casosCalls = express.Router();

casosCalls.post('/create-casos', async (req, res) => {
    try {
        const {...caso} = req.body
        console.log(caso)
        await casosModel.create(caso, {
            fields: ['idEstadoFK', 'idRobotFK', 'nombre', 'porcentaje', 'datos', 'idtipo']
          });
        res.json({
            "message": "Caso creado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
})
casosCalls.post('/get-casos', async (req, res) => {
    try {
        const token = req.get('authorization')?.split(' ')[1]; // Obtener token del encabezado
        if (!token) {
            return res.status(401).json({ error: 'Token missing' });
        }

        const decodedToken = jwt.verify(token, process.env.CLAVE_SECRETA);
        if (!decodedToken) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        casosModel.belongsTo(estadosModel, { foreignKey: 'idEstadoFK', targetKey: 'idEstado' });


        //estadosModel.hasMany(casosModel, { foreignKey: 'idEstadoFK' }); 
        const idtipo = req.body.idtipo; // Obtener idtipo del cuerpo de la solicitud

        const casosPorEstado = await casosModel.findAll({
          attributes: [
            [Sequelize.literal('estado.nombre'), 'nombre'],
            [Sequelize.literal('estado.idEstado'), 'idestado'],
            [Sequelize.fn('COUNT', Sequelize.col('*')), 'numeroCasos'],
          ],
          include: {
            model: estadosModel,
            attributes: [],
          },
          where:{
            idtipo: idtipo
          },
          group: ['estado.nombre'],
        });
        
        res.json(casosPorEstado);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});
casosCalls.post('/get-casos-id-estado', async (req, res) => {
  try {
      // const token = req.get('authorization')?.split(' ')[1]; // Obtener token del encabezado
      // if (!token) {
      //     return res.status(401).json({ error: 'Token missing' });
      // }

      // const decodedToken = jwt.verify(token, process.env.CLAVE_SECRETA);
      // if (!decodedToken) {
      //     return res.status(401).json({ error: 'Invalid token' });
      // }
      casosModel.belongsTo(estadosModel, { foreignKey: 'idEstadoFK', targetKey: 'idEstado' });


      //estadosModel.hasMany(casosModel, { foreignKey: 'idEstadoFK' }); 
      const idestado = req.body.idEstado; // Obtener idtipo del cuerpo de la solicitud
      const casosPorEstado = await casosModel.findAll({
        attributes: [
          [Sequelize.literal('casos.idCaso'), 'idCaso'],
          [Sequelize.literal('estado.nombre'), 'nombreEstado'],
          [Sequelize.literal('casos.nombre'), 'nombreCaso'],
          [Sequelize.literal('casos.porcentaje'), 'porcentaje'],
          [Sequelize.literal('casos.datos'), 'datos'],
        ],
        include: {
          model: estadosModel,
          attributes: [],
        },
        where:{
          idEstadoFK: idestado
        }
      });
      
      res.json(casosPorEstado);
  } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
  }
});

export default casosCalls;
