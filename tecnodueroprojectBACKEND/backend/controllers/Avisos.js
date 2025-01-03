import express, { response } from 'express';
import Utils from './Utils.js'
import { Op, Sequelize} from 'sequelize';
import avisosModel from '../models/avisosModel.js';
import direccionesModel from '../models/direccionesModel.js';
import clientesModel from '../models/clientesModel.js';
const atributos = ['idCaso', 'idEstadoFK', 'idRobotFK', 'nombre', 'porcentaje', 'datos']
const AvisosCalls = express.Router();

AvisosCalls.post('/get-avisos',async(req, res)=>{
    try {
        Utils.checkToken(req, res);
        avisosModel.belongsTo(direccionesModel, { foreignKey: 'id_direccion', targetKey: 'id' });
        direccionesModel.belongsTo(clientesModel,{foreignKey:'id_cliente', targetKey: 'id'})

        //estadosModel.hasMany(casosModel, { foreignKey: 'idEstadoFK' }); 
        const idtipo = req.body.idtipo; // Obtener idtipo del cuerpo de la solicitud
        // let fecha= new Date(req.body.diaSeleccionado); 
        // fecha = fecha.toLocaleDateString()
        // let partes = fecha.split("/"); // Divide la cadena en partes usando "/"
        // let formattedDate = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
        let startDatePartes = new Date(req.body.startDate).toLocaleDateString().split("/")
        let startDate = `${startDatePartes[2]}-${startDatePartes[1].padStart(2, '0')}-${startDatePartes[0].padStart(2, '0')}`;

        let endDatePartes = new Date(req.body.endDate).toLocaleDateString().split("/")
        let endDate = `${endDatePartes[2]}-${endDatePartes[1].padStart(2, '0')}-${endDatePartes[0].padStart(2, '0')}`;
        let estadoWhere = req.body.estado
        const avisos = await avisosModel.findAll({
          attributes: [
            [Sequelize.col('direccione.cliente.nombre'), 'nombre'],
            [Sequelize.col('direccione.cliente.telefono'), 'telefono'],
            [Sequelize.col('direccione.cliente.apellidos'), 'apellido'],
            [Sequelize.col('direccione.calle'), 'calle'],
            'id', 'titulo', 'fecha', 'hora', 'observaciones', 'presupuesto', 'tipo', 'estado'
          ],
          include: [
            {
              model: direccionesModel,
              include: [
                {
                  model: clientesModel,
                  attributes: ['nombre'] // Ajusta según las columnas que realmente necesitas de clientesModel
                }
              ],
              attributes: [] // Ajusta según las columnas que realmente necesitas de direccionesModel
            }
          ],
          where: {
            fecha: Sequelize.where(
              Sequelize.fn('DATE', Sequelize.col('fecha')),
              {
                [Op.between]: [startDate, endDate] // Aquí es donde se define el rango de fechas
              }
            ),
            estado: estadoWhere
          },
          order:[
            ['id', 'DESC']
          ]
        });
        
        res.json(avisos);
    } catch (error) {
        console.log(error)
    }
})
AvisosCalls.post('/create-aviso',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        const datosAviso= req.body.aviso
        await avisosModel.create(datosAviso, {
            fields: ['titulo', 'fecha', 'hora', 'id_direccion', 'observaciones',  'presupuesto', 'tipo']
          });
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
AvisosCalls.post('/get-aviso',async(req, res)=>{
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
        const response = await avisosModel.findAll({
            where: whereClause
        })
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
AvisosCalls.post('/update-aviso',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        const nuevosDatos = req.body.nuevosDatos
        const criterio = req.body.criterio
        console.log(nuevosDatos)
        console.log(criterio)
        const resultado = await avisosModel.update(nuevosDatos, {
            where: criterio
        });
        res.status(200).json(resultado)
    }catch(error){
        console.log(error)
    }
})
AvisosCalls.post('/delete-aviso',async(req, res)=>{
    try{
        Utils.checkToken(req,res)
        const avisoId = req.body.avisoId
        const response = await clientesModel.destroy({
            where: { id: avisoId }
        });
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
export default AvisosCalls
