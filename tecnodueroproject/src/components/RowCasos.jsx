import React, { useState, useEffect } from "react";
import moment from 'moment'
import { saveAs } from "file-saver";
import ProgressComponent from './ProgressComponent'
import casos from "../services/casos";
const TableComponent = ({ data }) => {
    const [caso, setCaso] = useState([]);

    useEffect(() => {
        
        setCaso(data);
    }, [data]); // Actualiza el estado 'caso' cuando 'data' cambia

    const handleDownload = (datos, nombre) => {
        const csvByteArray = Uint8Array.from(datos.data); // Convertir el arreglo de bytes en un Uint8Array
        const blobData = new Blob([csvByteArray], { type: 'text/csv' }); // Crear el Blob con el arreglo de bytes
        saveAs(blobData, nombre +'.csv');
    };
    const handleRevivir = async (idCaso)=>{
        try{
            const response =  await casos.updateEstado({
                idCaso,
                nuevoEstado: 5
            })
            setCaso(prevCaso => prevCaso.map(c => c.idCaso === idCaso ? { ...c, nombreEstado: 'En cola' } : c));
        }catch(error){
            console.log('ERROR: error al revivir el caso')
        }
    }

    return (
        <div style={{ maxHeight: "300px", overflowY: "auto" }}> {/* Aplicar estilos CSS para hacer el componente desplazable */}    
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID Caso</th>
                        <th>Estado</th>
                        <th>Nombre</th>
                        <th>Porcentaje</th>
                        <th>Fecha creacion</th>
                        <th>Fecha inicio</th>
                        <th>Fecha fin</th>
                        <th>Datos</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {caso.map((caso, index) => (
                        <tr key={index} className={caso.nombreEstado === 'En cola' ? 'encola' : ''}>
                            <td>{caso.idCaso}</td>
                            <td>{caso.nombreEstado}</td>
                            <td>{caso.nombreCaso}</td>
                            <td> <ProgressComponent>{caso.porcentaje}</ProgressComponent> </td>
                            <td>{moment(caso.fh_creacion).format('DD-MM-YYYY HH:mm:ss')}</td>
                            <td>{moment(caso.fh_tramitacion).format('DD-MM-YYYY HH:mm:ss')}</td>
                            <td>{moment(caso.fh_fin).format('DD-MM-YYYY HH:mm:ss')}</td>
                            <td>
                                {caso.datos.data.length !== 1 ? (
                                    <button className="btn btn-success" onClick={() => handleDownload(caso.datos, caso.nombreCaso)}>Download</button>
                                ) : (
                                    <button className="btn btn-success" disabled>No disponible</button>
                                )}
                            </td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleRevivir(caso.idCaso)}>Revivir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
