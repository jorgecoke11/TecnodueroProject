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

    return (
        <>
            <div>
                <Dropdown label="Ejecuciones" onClick={() => getEjecuciones()}>
                    <Table striped bordered hover>
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
                            {ejecucion.map((e, index) => (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.ejecutable.nombre}</td>
                                    <td>{e.estados_ejecucion.nombre}</td>
                                    <td>{UtilsDate.formatDate(e.fh_inicio)}</td>
                                    <td>{UtilsDate.formatDate(e.fh_fin)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Dropdown>
            </div>
        </>
    );
};

export default Ejecuciones;
