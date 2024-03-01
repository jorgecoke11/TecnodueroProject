import jwt from 'jsonwebtoken';
import express from 'express';
const cuponesCalls = express.Router();
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
  cuponesCalls.post('/get-cupones', async (req, res) => {
    try {
        // Ejecutar la actualización
        checkToken(req, res);
        const body = req.body;
        console.log(body.idEstado);
        const resultado = await casosModel.findOne({
          attributes: ['id', 'nombre', 'cupon'],
          where: { id: body.id }
      });
        res.json(resultado)
    } catch (error) {
        console.error('Error al obtener casos disponibles', error);
        return res.status(500).json({ "message": "Error al obtener casos disponibles" });
    }
  });
  export default cuponesCalls