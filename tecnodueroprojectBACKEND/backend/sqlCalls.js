import UsuariosModel from "../backend/models/model.js";
import bcrypt from 'bcrypt';
import { request } from "https";
import jwt from 'jsonwebtoken'
//** METODOS **//
const atributos = ['id_usuario', 'nombre', 'apellido_1', 'apellido_2', 'password', 'username', 'tipo_usuario']
//Mostrar registros
export const getAllUsuarios = async (req, res) => {
    let decodedToken = {}
    try {
        const authorization = req.get('authorization')
        let token = ''
        
        if(authorization && authorization.toLowerCase().startsWith('bearer')){
            token = authorization.substring(7)
            
        }
        try{
            decodedToken = jwt.verify(token, process.env.CLAVE_SECRETA)
        }catch{}
        console.log(decodedToken)
        if(!token || !decodedToken){
            return res.status(401).json({
                error:'token missing or invalid'
            })
        }
        
        const usuarios =  await UsuariosModel.findAll({
            attributes: atributos
        })
      
        res.json(usuarios)
        
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Mostrar un aviso
export const getUsuario = async (req, res)=>{
    try {
        const aviso = await UsuariosModel.findAll({
            attributes: atributos,
            where:{
                id_usuario:req.params.id
            }
        })
        res.json(aviso[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//Mostrar un usuario nombre
export const getUsuarioNombre = async(req,res) =>{
    try{
        const usuario = await UsuariosModel.findAll({
            attributes: atributos,
            where:{
                username:req.params.username
            }
        })
        res.json(usuario[0])
    }catch(error){
        res.json({message: error.message})
    }
}
//Crear un aviso
export const createUsuario = async (req,res)=>{
    try {
        // Extraer la contraseña del cuerpo de la solicitud
        console.log('Cuerpo de la solicitud:', req.body); // Agrega esta línea para depurar 
        const saltRounds  = 10;
        // Generar el hash de la contraseña
        const { password, ...userData } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crear un nuevo objeto de usuario con la contraseña encriptada
        const userWithHashedPassword = {
            ...userData,
            password: hashedPassword,
        };
        console.log('Cuerpo de la solicitud:', userWithHashedPassword); // Agrega esta línea para depurar 
        await UsuariosModel.create(userWithHashedPassword,{
            fields: atributos,
        })
        res.json({
            "message": "Usuario creado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//actualizar Aviso
export const updateUsuario = async (req,res)=>{
    try {
        await UsuariosModel.update(req.body, {
            where: {id :req.params.id}
        })
        res.json({
            "message": "Usuario actualizado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//eliminar un aviso
export const deleteUsuario = async (req,res) =>{
    try {
        UsuariosModel.destroy({
                where :{id: req.params.id}
        })
        res.json({
            "message": "Usuario eliminado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}