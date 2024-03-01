const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Función para leer el cupón desde el archivo de texto

const login = async () =>{
    const username = "robot"
    const passWord = "R0bot"
    const credentials = {
        username,
        passWord
    }
    const login = await axios.post('http://localhost:8000/api/login/', credentials)
    token = login.data.token
    config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
}

function leerCupon() {
    const documentosPath = path.join(require('os').homedir(), 'Documents');
    const cuponFilePath = path.join(documentosPath, 'cupon.txt');
    return fs.readFileSync(cuponFilePath, 'utf8').trim();
}

const optionsCatalogoBalay = [
    'Hornos', 'Placas', 'Placa Con Extractor Integrado', 'Microondas',
    'Campanas', 'Módulos De Calentamiento', 'Sets', 'Placas Dominó',
    'Grill Y Teppan Yaki', 'Accesorios Comerciales Cocina',
    'Accesorios Cocina', 'Limpieza Y Mantenimiento Cocina', 'Lavadoras',
    'Secadoras', 'Lavadoras-Secadoras', 'Set Lavado',
    'Accesorios Comeriales Lavadoras', 'Accesorios Lavadoras',
    'Limpieza Y Mantenimiento Lavadoras', 'Lavavajillas',
    'Accesorios Comerciales Lavavajillas', 'Accesorios Lavavajillas',
    'Limpieza Y Mantenimiento Lavavajillas', 'Frigoríficos Combis',
    'Frigoríficos Una Puerta', 'Americanos', 'Congeladores', 'Vinotecas',
    'Accesorios Comerciales Frigo', 'Filtros De Agua Y Otros Accesorios',
    'Limpieza Y Mantenimiento Frigo', 'Accesorios Cafeteras',
    'Limpieza Y Mantenimiento Cafeteras', 'Accesorios Comerciales Reparacion',
    'Accesorios Planchado', 'Descalcificadores Para Planchas',
    'Bolsas Aspiradores Y Más Accesorios', 'Descalcificadores',
    'Productos de Limpieza', 'Filtros De Agua', 'Bolsas De Aspiradores',
    'Filtros De Carbón Activo Para Campanas'
];

const proveedor = 'Siemens';
const iva = 21;
const beneficio = 10;
const idEstadoFK = 5;
const idRobotFK = 1;
const porcentaje = 0;
const datos = 0;
const idtipo = 3;
let token=''
let config = ''
// Ejecutar la función de login antes de crear casos
login().then(() => {
    // Leer el cupón del archivo de texto
    const cupon = leerCupon();

    // Crear casos para cada producto en optionsCatalogoBalay
    optionsCatalogoBalay.forEach(async (producto) => {
        const jsonNegocio = {
            proveedor,
            iva,
            beneficio,
            cupon,
            producto
        };
        const nombre = `${producto} ${proveedor}`;

        const payload = {
            idEstadoFK,
            idRobotFK,
            nombre,
            porcentaje,
            datos,
            idtipo,
            jsonNegocio
        };

        try {
            const respuesta = await axios.post('http://localhost:8000/api/robots/create-casos', payload, config);
            console.log(`Caso creado para el producto: ${producto}`);
            // Aquí puedes manejar la respuesta si es necesario
        } catch (error) {
            console.error(`Error al crear caso para el producto ${producto}:`, error.message);
            // Aquí puedes manejar el error si es necesario
        }
    });
}).catch(error => {
    console.error('Error en el login:', error.message);
});
