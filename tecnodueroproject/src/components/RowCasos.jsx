import React, { useState, useEffect } from "react";
import moment from 'moment'
import { saveAs } from "file-saver";

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

    return (
        <div style={{ maxHeight: "300px", overflowY: "auto" }}> {/* Aplicar estilos CSS para hacer el componente desplazable */}    
            <table className="table">
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
                    </tr>
                </thead>
                <tbody>
                    {caso.map((caso, index) => (
                        <tr key={index}>
                            <td>{caso.idCaso}</td>
                            <td>{caso.nombreEstado}</td>
                            <td>{caso.nombreCaso}</td>
                            <td>{caso.porcentaje}</td>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
