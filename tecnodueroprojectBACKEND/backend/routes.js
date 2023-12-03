import express from 'express'
import { getAllUsuarios, updateUsuario, deleteUsuario, getUsuario, createUsuario, getUsuarioNombre } from './sqlCalls.js'
import {createCookie} from './Controller.js'
export const routerUsuarios = express.Router()

routerUsuarios.get('/', getAllUsuarios)
routerUsuarios.get('/:id', getUsuario )
routerUsuarios.post('/', createUsuario)
routerUsuarios.put('/:id', updateUsuario)
routerUsuarios.delete('/:id', deleteUsuario)
routerUsuarios.get('/username/:username', getUsuarioNombre)
routerUsuarios.post('/cookie/:data', createCookie)
export default routerUsuarios