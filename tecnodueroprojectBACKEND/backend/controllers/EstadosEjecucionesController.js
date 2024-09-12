import express from 'express';
import estadosEjecucionModel from '../models/estadosEjecucion.js'
const estadosEjecucionCalls = express.Router();
estadosEjecucionCalls.post('/get-estado-ejecucion', async (req, res) => {
    try {
       await checkToken(req, res);
        const body = req.body;
        const resultado = await estadosEjecucionModel.findOne({
          where: { id_estado: body.idEstado}
      });
        res.json(resultado)
    } catch (error) {
      console.log(error)
    }
  });
  export default estadosEjecucionCalls