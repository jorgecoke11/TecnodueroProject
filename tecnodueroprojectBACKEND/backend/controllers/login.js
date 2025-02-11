import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import express from 'express';
import UserModel from '../models/model.js';

const loginRouter = express.Router();
const attributes =  ['id_usuario', 'nombre', 'apellido_1', 'apellido_2', 'password', 'username', 'tipo_usuario']
loginRouter.post('/', async(request, response)=> {
  try{
    const{body} = request
    const {username, passWord} = body
    console.log(body)
    const user = await UserModel.findOne({attributes, where: { username } });

    const passwordCorrect = user === null 
        ? false
        : await bcrypt.compare(passWord, user.password)

    if(!(user && passwordCorrect)){
        response.status(401).json({
            error: 'Contraseña o usuario invalido'
        })
    }
    else{
        const userForToken ={
            name: user.nombre,
            username: user.username
        }
        const token = jwt.sign(
            userForToken, 
            process.env.CLAVE_SECRETA,
            {
                expiresIn: 60 * 60 *24 *7 
            }) 
        response.send({
            name: user.nombre,
            username: user.username,
            token: token
        })
    }
  }catch(exc){
    console.log(exc)
    return response.status(500).json({ error: 'Error al hacer login' });
  }


        
})
export default loginRouter