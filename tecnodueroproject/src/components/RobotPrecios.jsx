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
const InputRobotPrecios = () =>{
    const [proveedor, setProveedor] = useState('')
    const [iva, setIva] = useState('')
    const [cuponBD, setCuponBD] = useState('')
    const [beneficio, setBeneficio] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [cupon, setCupon] = useState('')
    const [producto, setProducto] = useState('')
    const [modalContent, setModalContent] = useState('')
    const handleCuponBD = async () =>{
        const response = await cuponCalls.getCupones({
            id: 1
        })
        setCuponBD(response);
    }
    // useEffect(() => {
    //     handleCuponBD()
    // }, [cuponBD]);
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
    const handleLanzar = async (event)=>{
        try {
            event.preventDefault();
            const respuesta = await robotPrecios.lanzarRobot();
            if(respuesta.message == "Programa ejecutado correctamente."){
                setModalContent(
                    <div>
                        <h1>{respuesta.message}</h1>
                   </div>)
                   setShowModal(true);
            }
            console.log(respuesta.message)
    } catch(exc){
        console.log(exc)
    }

}
const handleCrearCaso = async(event) =>{
    try{
        event.preventDefault();
        const jsonNegocio = {
            "proveedor": proveedor,
            "iva": iva,
            "beneficio": beneficio,
            "cupon": cupon,
            "producto": producto[0]
        }
        const idEstadoFK = 5
        const idRobotFK = 1
        const nombre = producto + ' ' + proveedor
        const porcentaje = 0
        const datos = 0
        const idtipo = 1 
        const respuesta = await robotPrecios.crearCaso({
            idEstadoFK,
            idRobotFK,
            nombre,
            porcentaje,
            datos,
            idtipo,
            jsonNegocio
        })
        if(respuesta.message == "Caso creado correctamente"){
            setModalContent(
                <div>
                    <h1>Caso creado correctamente</h1>
               </div>)
            setShowModal(true);
        }
    }catch(exc){

    }
    
    }
    return(
        <div className='container mt-5'>
            <div>
                <InputComponent placeHolder='cuponBD' setInputText={setCuponBD}></InputComponent>
                <ToggleSwitch idRobot='1'></ToggleSwitch>
                <label >Proveedor</label>
                <SelectComponent 
                    placeHolder='Proveedor' 
                    options={proveedoresOptions}
                    setOptionText={setProveedor}
                >
                </SelectComponent>
                <label >IVA</label>
                <InputNumberComponent placeHolder='IVA' setInputText={setIva}></InputNumberComponent>
                <label >Beneficio</label>
                <InputNumberComponent placeHolder='Beneficio' setInputText={setBeneficio}></InputNumberComponent>
                <label >Cupón</label>
                <InputComponent placeHolder='Cupón' setInputText={setCupon}></InputComponent>
                <label>Catalogo de Productos</label>
                <SelectMultipleComponent 
                    placeHolder='Producto' 
                    options={optionsCatalogoBalay}
                    setOptionText={setProducto}
                >
                </SelectMultipleComponent>
                <div className='mt-3'>
                    <button type='submit' className='btn btn-primary' onClick={handleLanzar}>Lanzar</button>
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