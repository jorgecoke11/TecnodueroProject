import express from 'express';
import cors from 'cors';
import config from './dbConfig.js';
import UsuariosRoutes from './routes.js'
import db from './db.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import loginRouter from './controllers/login.js'
import scriptPrecios from './controllers/Robots.js';
import casosCalls from './controllers/Casos.js'
import estadosCalls from './controllers/Estados.js'
import cuponesCalls from './controllers/Cupones.js'
import tiposCasoCalls from './controllers/TiposCaso.js'
import maquinasCalls from './controllers/MaquinasController.js' 
import ejecutablesCalls from './controllers/Ejecutables.js';
import procesosCalls from './controllers/procesos.js';
import parametrosCalls from './controllers/parametros.js';
import clientesCalls from './controllers/Clientes.js';
import direccionesCalls from './controllers/Direcciones.js'
import AvisosCalls from './controllers/Avisos.js';
import EndPointsUtils from './controllers/EndPointsUtils.js';
import ejecucionesCalls from './controllers/Ejecuciones.js'
import trazaCalls from './controllers/traza.js';
import path from 'path';
import desplieguesCalls from './controllers/Despliegue.js';
dotenv.config();

const app = express()
const ruta = path.join(process.env.PATH_ROBOT_DEBUG, 'capturas')
app.use('/screenshots', express.static(ruta));
console.log('Serviendo imágenes desde:', ruta);
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(cookieParser());
app.set('trust proxy', true);
app.use((req, res, next) => {
    const clientIp = req.headers['x-forwarded-for'] || req.remoteAddress;
    console.log(req.headers.host)
    next();
}); 
app.use(express.json())
app.use('/usuarios', UsuariosRoutes) 
app.use('/api/login', loginRouter)
app.use('/api/robots',scriptPrecios)
app.use('/api/robots', casosCalls)
app.use('/api/robots',estadosCalls)
app.use('/api/robots/cupones',cuponesCalls)
app.use('/api/robots/tiposcaso', tiposCasoCalls)
app.use('/api/robots/maquinas', maquinasCalls)
app.use('/api/robots/ejecuciones', ejecucionesCalls) 
app.use('/api/robots/ejecutables', ejecutablesCalls)
app.use('/api/robots/trazas', trazaCalls)
app.use('/api/procesos', procesosCalls)
app.use('/api/parametros',parametrosCalls)
app.use('/api/avisos/clientes', clientesCalls)
app.use('/api/avisos/direcciones', direccionesCalls)
app.use('/api/avisos/avisos', AvisosCalls)
app.use('/api/utils', EndPointsUtils)
app.use('/api/robots/despliegues',desplieguesCalls)
try {
    await db.authenticate()
    console.log('Conexion correcta a la base de datos')
} catch (error) {
    console.log(`El error de conexion es: ${error}`)
}

app.listen(config.port, ()=>{
    console.log('Server UP runing in http://localhost:8000/')
})
