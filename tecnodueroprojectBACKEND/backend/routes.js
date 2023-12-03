import express from 'express'
import { getAllUsuarios, updateUsuario, deleteUsuario, getUsuario, createUsuario } from './sqlCalls.js'

export const routerUsuarios = express.Router()

routerUsuarios.get('/', getAllUsuarios)
routerUsuarios.get('/:id', getUsuario )
routerUsuarios.post('/', createUsuario)
routerUsuarios.put('/:id', updateUsuario)
routerUsuarios.delete('/:id', deleteUsuario)

export default routerUsuarios