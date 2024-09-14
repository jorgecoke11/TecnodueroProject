import React, { useEffect, useState } from "react";
import useUser from "../../hooks/useUser.js";
import Dropdown from "../Desplegable.jsx";
import ejecucionesServices from "../../services/ejecuciones.js";
import Table from 'react-bootstrap/Table';
import UtilsDate from "../../js/UtilsDate.js";

const Ejecuciones = ({ id_caso_fk }) => {
    const [ejecucion, setEjecucion] = useState([]);
    const { jwt } = useUser();

    const getEjecuciones = async () => {
        try {
            const response = await ejecucionesServices.getEjecuciones(jwt, {
                id_caso_fk
            });
            setEjecucion(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getEjecuciones();
    }, []); // Corre solo al cargar el componente por primera vez
    const getRowStyle = (estado) => {
        switch (estado) {
            case 10: return { backgroundColor: 'rgb(173 255 128)' }; 
            case 8: return { backgroundColor: '#f2dede' }; 
            case 6: return { backgroundColor: 'rgb(231 255 125)' }; 
            default: return {}; 
        }
    };
    return (
        <>
            <div>
                <Dropdown label="Ejecuciones" onClick={() => getEjecuciones()}>
                    <Table >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ejecutable</th>
                                <th>Estado</th>
                                <th>Fh. Inicio</th>
                                <th>Fh. Fin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ejecucion.length ? ejecucion.map((e) => (
                                <tr key={e.id} style={getRowStyle(e.id_estado_fk)}>
                                    <td style={getRowStyle(e.id_estado_fk)}>{e.id}</td>
                                    <td style={getRowStyle(e.id_estado_fk)}>{e.ejecutable.nombre}</td>
                                    <td style={getRowStyle(e.id_estado_fk)}>{e.estados_ejecucion.nombre}</td>
                                    <td style={getRowStyle(e.id_estado_fk)}>{UtilsDate.formatDate(e.fh_inicio)}</td>
                                    <td style={getRowStyle(e.id_estado_fk)}>{UtilsDate.formatDate(e.fh_fin)}</td>
                                </tr>
                            )) 
                        : 
                        <tr><td colSpan="5"><b>No hay ejecuiones en este caso</b></td></tr>
                        }

                        </tbody>
                    </Table>
                </Dropdown>
            </div>
        </>
    );
};

export default Ejecuciones;
