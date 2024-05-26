import express, { response } from 'express';
import Utils from './Utils.js'
import { Op, Sequelize } from 'sequelize';
import avisosModel from '../models/avisosModel.js';
import direccionesModel from '../models/direccionesModel.js';
import clientesModel from '../models/clientesModel.js';
const atributos = ['idCaso', 'idEstadoFK', 'idRobotFK', 'nombre', 'porcentaje', 'datos']
import nodemailer from 'nodemailer';
const EndPointsUtils = express.Router();

EndPointsUtils.post('/send-email', async (req, res) => {

    const { to, subject, text, html } = req.body;
    console.log(req.body)
    // Configurar el transporte de nodemailer
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Cambia esto si usas otro servicio
        auth: {
            user: process.env.EMAIL, // Reemplaza con tu correo
            pass: process.env.EMAIL_PASS   // Reemplaza con tu contraseña
        }
    });

    // Configurar el correo electrónico
    let mailOptions = {
        from: process.env.EMAIL, // Reemplaza con tu correo
        to: to,
        subject: subject,
        text: text
    };
    // Enviar el correo electrónico
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).send({ message: 'Email sent', info: info });
    } catch (error) {
        console.error('Error sending email: ', error);
        res.status(500).send({ message: 'Error sending email', error: error });
    }
})
export default EndPointsUtils