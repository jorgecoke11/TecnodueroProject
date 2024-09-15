import jwt from 'jsonwebtoken';
import express from 'express';
import { execFile } from 'child_process';
import { execPath } from 'process';
import casosModel from '../models/casosModel.js';
import Utils from './Utils.js'
import estadosModel from '../models/estadosModel.js'
import { INTEGER, Sequelize } from 'sequelize';
import tipoCasoModel from '../models/tipoCasoModel.js';
const atributos = ['idCaso', 'idEstadoFK', 'idRobotFK', 'nombre', 'porcentaje', 'datos']
const casosCalls = express.Router();
casosCalls.post('/get-caso-generico',async(req, res)=>{
  try{
      Utils.checkToken(req,res)
      console.log(req.body)
      const response = await casosModel.findOne({
          where: req.body.whereGenerico    
      })
      res.json(response)
  }catch(error){
      console.log(error)
  }
})
casosCalls.post('/create-casos', async (req, res) => {
    try {
        checkToken(req,res)
        const {...caso} = req.body
        const idTipoCaso = await tipoCasoModel.findAll({
          attributes: ['idtipo'],
          where:{ 
            Nombre: caso.jsonNegocio['proveedor'] 
          }
        })
        const casoConTipo = 
        {
          ...caso,
          idtipo: idTipoCaso[0].dataValues.idtipo,
        }
        const newCaso = await casosModel.create(casoConTipo, {
          fields: ['idEstadoFK', 'idRobotFK', 'nombre', 'porcentaje', 'datos',  'jsonNegocio','idtipo']
        });

        res.json({
            "message": "Caso creado correctamente",
            "idCaso": newCaso.idCaso
        })
    } catch (error) {
        res.send( {message: error.message} )
    }
})

casosCalls.post('/get-casos', async (req, res) => {
    try {
        checkToken(req, res);
        casosModel.belongsTo(estadosModel, { foreignKey: 'idEstadoFK', targetKey: 'idEstado' });


        //estadosModel.hasMany(casosModel, { foreignKey: 'idEstadoFK' }); 
        const idtipo = req.body.idtipo; // Obtener idtipo del cuerpo de la solicitud
        let fh_creacion = new Date(req.body.fh_creacion); 
        fh_creacion = fh_creacion.toLocaleDateString()
        let partes = fh_creacion.split("/"); // Divide la cadena en partes usando "/"
        let formattedDate = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
        const casosPorEstado = await casosModel.findAll({
          attributes: [
            [Sequelize.literal('estado.nombre'), 'nombre'],
            [Sequelize.literal('estado.final'), 'final'],
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
              formattedDate
            )
          },
          group: ['estado.nombre'],
          order: [['final', 'ASC'],
                ['orden', 'ASC']]
        });
        
        res.json(casosPorEstado);
    } catch (error) {
        console.log(error)
    }
});
casosCalls.post('/get-casos-id-estado', async (req, res) => {
  try {
      checkToken(req, res);
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
          [Sequelize.literal('casos.fh_comienzo'), 'fh_comienzo'],
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
  }
});
casosCalls.post('/update-estado', async (req, res) => {
  try {
      // Ejecutar la actualización
      checkToken(req, res);
      const body = req.body;
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
  }
});
casosCalls.post('/casos-disponibles', async (req, res) => {
  try {
      // Ejecutar la actualización
      //checkToken(req, res);
      const body = req.body;
      console.log(body);
      const resultado = await casosModel.findOne({
        attributes: ['idCaso', 'jsonNegocio'],
        where: { idEstadoFK: body.idEstado,
          idRobotFK: body.robotId}
    }); 
      res.json(resultado)
  } catch (error) {
      console.error('Error al obtener casos disponibles', error);
      res.status(500)
  }
});
casosCalls.post('/update-fhtramitacion', async (req, res) => {
  try {
      // Ejecutar la actualización
      checkToken(req, res);
      const body = req.body;
      const fh_comienzo = body.fh_comienzo
      const resultado = await casosModel.update(
          { fh_comienzo:fh_comienzo }, // Nuevos valores a actualizar
          { where: { idCaso: body.idCaso } } // Condición para seleccionar el caso a actualizar
      );
      res.status(200).json(resultado);
  } catch (error) {
      console.error('Error al actualizar el caso:', error);
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
  } catch (error) {
      console.error('Error al actualizar el caso:', error);
  }
});
function checkToken(req, res){
  try{
    const token = req.get('authorization')?.split(' ')[1]; // Obtener token del encabezado
    if (!token) {
        return res.status(401).send({ error: 'Token missing' });
    }
  
    const decodedToken = jwt.verify(token, process.env.CLAVE_SECRETA);
    if (!decodedToken) {
        return res.status(401).send({ error: 'Invalid token' });
    }
  }catch(error){
    if (error.name === 'TokenExpiredError') {
      res.status(510).send({ error: 'Token expired. Please login again.' });
    } else {
      // Otros errores de JWT o de verificación de token
      console.error('Error al verificar el token:', error.message);
      return res.status(500).send({ error: 'Internal server error' });
    }
  }
}
casosCalls.post('/update-generico', async (req, res) => {

    checkToken(req, res);
    const nuevosDatos = req.body.nuevosDatos
    const criterio = req.body.criterio

    try {
      const resultado = await casosModel.update(nuevosDatos, {
          where: criterio
      });
      
      console.log(resultado)
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Error al actualizar el caso:', error);
      return res.status(500).send({ "message": "Error al actualizar el caso" });
    }
});
casosCalls.post('/get-casos-fecha', async (req, res) => {

  
  try {
    checkToken(req, res);
    const idEstado = req.body.idEstado; // Obtener idtipo del cuerpo de la solicitud
    const idtipo = req.body.idtipo
    console.log(idtipo)
    let fh_creacion = new Date(req.body.fh_creacion); 
    fh_creacion = fh_creacion.toLocaleDateString()
    let partes = fh_creacion.split("/"); // Divide la cadena en partes usando "/"
    let formattedDate = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
    casosModel.belongsTo(estadosModel, { foreignKey: 'idEstadoFK', targetKey: 'idEstado' });
    const resultado = await casosModel.findAll({
      attributes: [
        [Sequelize.literal('casos.idCaso'), 'idCaso'],
        [Sequelize.literal('estado.nombre'), 'nombreEstado'],
        [Sequelize.literal('estado.idEstado'), 'idEstado'],
        [Sequelize.literal('casos.nombre'), 'nombreCaso'],
        [Sequelize.literal('casos.porcentaje'), 'porcentaje'],
        [Sequelize.literal('casos.datos'), 'datos'],
        [Sequelize.literal('casos.fh_creacion'), 'fh_creacion'],
        [Sequelize.literal('casos.fh_comienzo'), 'fh_comienzo'],
        [Sequelize.literal('casos.fh_fin'), 'fh_fin']
      ],
      include: {
        model: estadosModel,
        attributes: [],
      },
      where:{
        idEstadoFK: idEstado,
        idtipo,
        fh_creacion: Sequelize.where(
          Sequelize.fn('DATE', Sequelize.col('fh_creacion')),
          formattedDate
        )
      },
      order: [
        ['fh_comienzo', 'DESC'] 
      ]

    });
    
    res.status(200).json(resultado);
  } catch (error) {
    console.error('Error al actualizar el caso:', error);
  }
});


export default casosCalls;
