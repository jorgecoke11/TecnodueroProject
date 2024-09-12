import jwt from 'jsonwebtoken';
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
 async function updateGenerico (req, res){
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
      return res.status(500).send({ "message": "Error al actualizar el caso" });
    }
  }
  export default {checkToken, updateGenerico}