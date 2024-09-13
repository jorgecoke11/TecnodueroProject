import express from 'express';
import trazaModel from '../models/traza.js'
import Utils from './Utils.js'
import path from 'path'
import fs from 'fs';
const trazaCalls = express.Router();
trazaCalls.post('/get-trazas-by-caso', async (req, res) => {
  try {
    Utils.checkToken(req, res);
    const body = req.body;
    const resultado = await trazaModel.findAll({
      where: { id_caso_fk: body.id_caso_fk }
    });
    res.json(resultado)
  } catch (error) {
    console.log(error)
  }
});
trazaCalls.post('/create-traza', async (req, res) => {
  try {
    Utils.checkToken(req, res);
    // Guardar la traza en la base de datos


    // Captura de pantalla serializada (base64) que llega en el body
    const screenshotBase64 = req.body.captura;
    let ruta = null;
    if (screenshotBase64) {
      // Convertir la cadena base64 en un buffer de imagen
      const screenshotBuffer = Buffer.from(screenshotBase64, 'base64');
      ruta = `screenshot_${Date.now()}.jpg`
      // Definir el nombre y la ruta donde se guardará la imagen
      const screenshotDir = path.join(process.env.PATH_ROBOT_DEBUG, 'capturas');
      const screenshotPath = path.join(screenshotDir, ruta);
      ruta = screenshotPath
      // Asegurarse de que el directorio exista
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }

      // Guardar la imagen en la carpeta
      fs.writeFileSync(screenshotPath, screenshotBuffer);
    }
  console.log(ruta)
    const response = await trazaModel.create({
      mensaje: req.body.mensaje,
      ejecutor: req.body.ejecutor,
      id_caso_fk: req.body.id_caso_fk,
      ruta_foto: ruta
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al crear la traza y guardar la captura' });
  }
});
trazaCalls.post('/update-generico', async (req, res) => {

  checkToken(req, res);
  const nuevosDatos = req.body.nuevosDatos
  const criterio = req.body.criterio
  try {
    const resultado = await trazaModel.update(nuevosDatos, {
      where: criterio
    });

    console.log(resultado)
    res.status(200).json(resultado);
  } catch (error) {
    console.error('Error al actualizar el caso:', error);
    return res.status(500).send({ "message": "Error al actualizar el caso" });
  }
});
export default trazaCalls