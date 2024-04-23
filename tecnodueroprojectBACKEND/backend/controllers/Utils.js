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
  export default {checkToken}