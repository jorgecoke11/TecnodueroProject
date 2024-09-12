import express from 'express';
import trazaModel from '../models/traza.js'
const trazaCalls = express.Router();
trazaCalls.post('/get-trazas-by-caso', async (req, res) => {
    try {
       await checkToken(req, res);
        const body = req.body;
        const resultado = await trazaModel.findOne({
          where: { id_caso_fk: body.id_caso_fk}
      });
        res.json(resultado)
    } catch (error) {
      console.log(error)
    }
  });
  trazaCalls.post('/create-traza',async(req,res)=>{
    try{

        Utils.checkToken(req, res)
        const response = await trazaModel.create({
            mensaje: req.body.mensaje,
            ejecutor: req.body.ejecutor,
            id_caso_fk: req.body.id_caso_fk
        })
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
})
  export default trazaCalls