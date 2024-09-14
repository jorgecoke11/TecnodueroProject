import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputComponent from './InputComponent';
import SelectComponent from './SelectComponent';
import InputNumberComponent from './InputNumberComponent';
import SelectMultipleComponent from './SelectMultipleComponent';
import robotPrecios from '../services/robotPrecios';
import ToggleSwitch from './ToggleSwitch';
import ModalComponent from './ModalComponent.jsx';
import cuponCalls from '../services/cupon.js'
import cuponesServices from '../services/cupon.js'
import ejecucionesServices from '../services/ejecuciones.js';
import useUser from '../hooks/useUser.js';
import Constantes from '../js/Constantes.js';
const InputRobotPrecios = () =>{
    const [proveedor, setProveedor] = useState('')
    const [iva, setIva] = useState('21')
    const [beneficio, setBeneficio] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [cupon, setCupon] = useState('')
    const [producto, setProducto] = useState('')
    const [modalContent, setModalContent] = useState('')
    const {jwt} =useUser()
    const optionsCatalogoBalay = ['Hornos', 'Placas', 
    'Placa Con Extractor Integrado',
    'Microondas',
    'Campanas',
    'Módulos De Calentamiento',
    'Sets',
    'Placas Dominó',
    'Grill Y Teppan Yaki',
    'Accesorios Comerciales Cocina',
    'Accesorios Cocina',
    'Limpieza Y Mantenimiento Cocina',
    'Lavadoras',
    'Secadoras',
    'Lavadoras-Secadoras',
    'Set Lavado',
    'Accesorios Comeriales Lavadoras',
    'Accesorios Lavadoras',
    'Limpieza Y Mantenimiento Lavadoras',
    'Lavavajillas',
    'Accesorios Comerciales Lavavajillas',
    'Accesorios Lavavajillas',
    'Limpieza Y Mantenimiento Lavavajillas',
    'Frigoríficos Combis',
    'Frigoríficos Una Puerta',
    'Americanos',
    'Congeladores',
    'Vinotecas',
    'Accesorios Comerciales Frigo',
    'Filtros De Agua Y Otros Accesorios',
    'Limpieza Y Mantenimiento Frigo',
    'Accesorios Cafeteras',
    'Limpieza Y Mantenimiento Cafeteras',
    'Accesorios Comerciales Reparacion',
    'Accesorios Planchado',
    'Descalcificadores Para Planchas',
    'Bolsas Aspiradores Y Más Accesorios',
    'Descalcificadores',
    'Productos de Limpieza',
    'Filtros De Agua',
    'Bolsas De Aspiradores',
    'Filtros De Carbón Activo Para Campanas']
    const proveedoresOptions = ['Balay', 'Bosch', 'Siemens']
const leerCupon = async()=>{
    try{
        const data = await cuponesServices.getCupones(jwt,{
            nombre: 'bsh'
        })
        setCupon(data)
        return data.cupon
    }catch(error){
        window.sessionStorage.clear()
        window.location= '/'
    }
}
const handleCrearCaso = async(event) =>{
    try{
        event.preventDefault();
        const jsonNegocio = {
            "proveedor": proveedor,
            "iva": iva,
            "beneficio": beneficio,
            "producto": producto[0]
        }
        const idEstadoFK = 5
        const idRobotFK = 1
        const nombre = producto + ' ' + proveedor
        const porcentaje = 0
        const datos = 0
        const respuesta = await robotPrecios.crearCaso(jwt,{
            idEstadoFK,
            idRobotFK,
            nombre,
            porcentaje,
            datos,
            jsonNegocio
        })
        const id_caso_fk = respuesta.idCaso
        console.log(respuesta)
        const respuestaEjecucion = await ejecucionesServices.createEjecucion(jwt,{
            id_caso_fk,
            id_ejecutable_fk: Constantes.EJECUTABLE_PRECIOS,
            id_estado_fk: Constantes.EJECUCIONES_SIN_ASIGNAR
        })
        if(respuesta.message == "Caso creado correctamente"){
            setModalContent(
                <div>
                    <h1>Caso creado correctamente</h1>
               </div>)
            setShowModal(true);
        }
    } catch (exc) {
        // Verifica si el error está relacionado con el token
        if (exc.message.includes("Token") || exc.message.includes("token")) {
            // Si el error está relacionado con el token, limpiar el almacenamiento y redirigir
            window.sessionStorage.clear();
            window.location = '/';
        } else {
            // Para cualquier otro error, muestra un modal con el mensaje de error
            setModalContent(
                <div>
                    <h1>Error: {exc.message}</h1>
                </div>
            );
            setShowModal(true);
        }
    }
    
    }
    return(
        <div className='container mt-5'>
            <div>
                <label >Proveedor</label>
                <SelectComponent 
                    placeHolder='Proveedor' 
                    options={proveedoresOptions}
                    setOptionText={setProveedor}
                >
                </SelectComponent>
                <label >Beneficio</label>
                <InputNumberComponent placeHolder='Beneficio' setInputText={setBeneficio}></InputNumberComponent>
                <label>Catalogo de Productos</label>
                <SelectMultipleComponent 
                    placeHolder='Producto' 
                    options={optionsCatalogoBalay}
                    setOptionText={setProducto}
                >
                </SelectMultipleComponent>
                <div className='mt-3'>
                    <button type='submit' className='btn btn-primary' onClick={handleCrearCaso}>Crear caso</button>
                </div>
            </div>
        <ModalComponent isOpen={showModal} onClose={() => setShowModal(false)}>
            {modalContent}
        </ModalComponent>
        </div>    
    )
}
export default InputRobotPrecios