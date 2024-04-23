import express from 'express';
import cors from 'cors';
import config from './dbConfig.js';
import UsuariosRoutes from './routes.js'
import db from './db.js'
import cookieParser from 'cookie-parser';
import loginRouter from './controllers/login.js'
import scriptPrecios from './controllers/Robots.js';
import casosCalls from './controllers/Casos.js'
import estadosCalls from './controllers/Estados.js'
import cuponesCalls from './controllers/Cupones.js'
import tiposCasoCalls from './controllers/TiposCaso.js'
import maquinasCalls from './controllers/MaquinasController.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express()

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

try {
    await db.authenticate()
    console.log('Conexion correcta a la base de datos')
} catch (error) {
    console.log(`El error de conexion es: ${error}`)
}

app.listen(config.port, ()=>{
    console.log('Server UP runing in http://localhost:8000/')
})
