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
        checkToken(req,res)
        const {...caso} = req.body
        console.log(caso)
        await casosModel.create(caso, {
            fields: ['idEstadoFK', 'idRobotFK', 'nombre', 'porcentaje', 'datos', 'idtipo', 'jsonNegocio']
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
        const fh_creacion = req.body.fh_creacion; 
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
            idtipo: idtipo,
            fh_creacion: Sequelize.where(
              Sequelize.fn('DATE', Sequelize.col('fh_creacion')),
              fh_creacion.slice(0,10).replace(/\//g, '-')
            )
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
      const idestado = req.body.idEstado; // Obtener idtipo del cuerpo de la solicitud
      const casosPorEstado = await casosModel.findAll({
        attributes: [
          [Sequelize.literal('casos.idCaso'), 'idCaso'],
          [Sequelize.literal('estado.nombre'), 'nombreEstado'],
          [Sequelize.literal('casos.nombre'), 'nombreCaso'],
          [Sequelize.literal('casos.porcentaje'), 'porcentaje'],
          [Sequelize.literal('casos.datos'), 'datos'],
          [Sequelize.literal('casos.fh_creacion'), 'fh_creacion'],
          [Sequelize.literal('casos.fh_tramitacion'), 'fh_tramitacion'],
          [Sequelize.literal('casos.fh_fin'), 'fh_fin']
        ],
        include: {
          model: estadosModel,
          attributes: [],
        },
        where:{
          idEstadoFK: idestado,
        }
      });
      
      res.json(casosPorEstado);
  } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
  }
});
casosCalls.post('/update-estado', async (req, res) => {
  try {
      // Ejecutar la actualización
      checkToken(req, res);
      const body = req.body;
      console.log(body.idCaso);
      const resultado = await casosModel.update(
          { idEstadoFK: body.nuevoEstado }, // Nuevos valores a actualizar
          { where: { idCaso: body.idCaso } } // Condición para seleccionar el caso a actualizar
      );
      res.status(200).json(resultado);
      // Verificar si se actualizó algún registro
      // if (resultado > 0) {
      //     console.log(`El caso con ID ${body.idCaso} se actualizó correctamente.`);
      //     res.status(200).json({ "message": "Caso actualizado correctamente" });
      // } else {
      //     console.log(`No se encontró ningún caso con ID ${body.idCaso}.`);
      //     res.status(500).json({ "message": `No se encontró ningún caso con ID ${body.idCaso}.` });
      // }
  } catch (error) {
      console.error('Error al actualizar el caso:', error);
      return res.status(500).json({ "message": "Error al actualizar el caso" });
  }
});
casosCalls.post('/casos-disponibles', async (req, res) => {
  try {
      // Ejecutar la actualización
      //checkToken(req, res);
      const body = req.body;
      console.log(body.idEstado);
      const resultado = await casosModel.findOne({
        attributes: ['idCaso', 'jsonNegocio'],
        where: { idEstadoFK: body.idEstado }
    });
      res.json(resultado)
  } catch (error) {
      console.error('Error al obtener casos disponibles', error);
      return res.status(500).json({ "message": "Error al obtener casos disponibles" });
  }
});
casosCalls.post('/update-fhtramitacion', async (req, res) => {
  try {
      // Ejecutar la actualización
      checkToken(req, res);
      const body = req.body;
      const fh_tramitacion = body.fh_tramitacion
      const resultado = await casosModel.update(
          { fh_tramitacion:fh_tramitacion }, // Nuevos valores a actualizar
          { where: { idCaso: body.idCaso } } // Condición para seleccionar el caso a actualizar
      );
      res.status(200).json(resultado);
  } catch (error) {
      console.error('Error al actualizar el caso:', error);
      return res.status(500).json({ "message": "Error al actualizar el caso" });
  }
});
casosCalls.post('/update-documento', async (req, res) => {
  try {
      // Ejecutar la actualización
      checkToken(req, res);
      const body = req.body;
      const bytes = Buffer.from(body.documento, 'base64');
      const resultado = await casosModel.update(
          { datos: bytes }, // Nuevos valores a actualizar
          { where: { idCaso: body.idCaso } } // Condición para seleccionar el caso a actualizar
      );
      res.status(200).json(resultado);
      // Verificar si se actualizó algún registro
      // if (resultado > 0) {
      //     console.log(`El caso con ID ${body.idCaso} se actualizó correctamente.`);
      //     res.status(200).json({ "message": "Caso actualizado correctamente" });
      // } else {
      //     console.log(`No se encontró ningún caso con ID ${body.idCaso}.`);
      //     res.status(500).json({ "message": `No se encontró ningún caso con ID ${body.idCaso}.` });
      // }
  } catch (error) {
      console.error('Error al actualizar el caso:', error);
      return res.status(500).json({ "message": "Error al actualizar el caso" });
  }
});
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
casosCalls.post('/update-generico', async (req, res) => {

    checkToken(req, res);
    const nuevosDatos = req.body.nuevosDatos
    const criterio = req.body.criterio
    console.log(nuevosDatos)
    console.log(criterio)
    try {
      const resultado = await casosModel.update(nuevosDatos, {
          where: criterio
      });
      
      console.log(resultado)
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Error al actualizar el caso:', error);
      return res.status(500).json({ "message": "Error al actualizar el caso" });
    }
});

export default casosCalls;
