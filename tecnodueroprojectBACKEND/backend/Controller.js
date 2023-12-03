import express from 'express'
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import { sessionData } from './sessionData.js';
export const createCookie = async(req, res) =>{
 // Genera un identificador de sesión único
 const sessionId = uuidv4();
console.log(sessionId)
 // Asocia el identificador de sesión con la información del usuario
 // (En este ejemplo, se está utilizando una estructura de datos simple. En un entorno de producción, puedes almacenar esto en una base de datos).
 const userData = {
     userId: req.params.data.id_usuario,
     username: req.params.data.username
 };
 console.log(req.params)
 // Almacena la asociación en el servidor (en este caso, solo en memoria)
 sessionData[sessionId] = userData;

 // Configura la cookie con el identificador de sesión
 res.cookie('sessionId', sessionId, {
     httpOnly: true,
     secure: process.env.NODE_ENV === 'production',
     sameSite: 'strict'
 });

 res.send('Inicio de sesión exitoso');
}
