import UsuariosModel from "./model.js";

//** METODOS **//
const atributos = ['id_usuario', 'nombre', 'apellido_1', 'apellido_2', 'password', 'username', 'tipo_usuario']
//Mostrar registros
export const getAllUsuarios = async (req, res) => {
    try {
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

//Crear un aviso
export const createUsuario = async (req,res)=>{
    try {
        await UsuariosModel.create(req.body)
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