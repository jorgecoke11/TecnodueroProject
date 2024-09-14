import React, { useEffect, useState } from 'react';
import useUser from "../../hooks/useUser.js";
import Dropdown from '../Desplegable';
import trazasServices from '../../services/traza.js';
import Table from 'react-bootstrap/esm/Table';
import Constantes from '../../js/Constantes.js';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
const Trazas = ({ id_caso_fk }) => {
    const [trazas, setTrazas] = useState([]);
    const { jwt } = useUser();
    const [show, setShow] = useState(false);
    const [rutaImg, setRutaImg] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = (rutaImg) => {setShow(true); setRutaImg(rutaImg)};


    const getTrazas = async () => {
        try {
            const response = await trazasServices.getTrazas(jwt, { id_caso_fk });
            setTrazas(response || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTrazas();
    }, []);

    return (
        <div>
            <Dropdown label='Trazas' onClick={() => getTrazas()}>
                <Table>
                    <thead>
                        <tr>
                            <th>Ejecutor</th>
                            <th>Mensaje</th>
                            <th>Foto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trazas.length > 0
                            ? trazas.map((traza) => (
                                <tr key={traza.id} >
                                    <td>{traza.ejecutor}</td>
                                    <td>{traza.mensaje}</td>
                                    {traza.ruta_foto != null
                                        ? <td><svg onClick={()=>handleShow(traza.ruta_foto)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-image" viewBox="0 0 16 16">
                                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
                                        </svg></td>
                                        : <label>No hay capturas</label>}
                                </tr>
                            ))
                            : <tr><td colSpan="2"><b>No hay trazas</b></td></tr>}
                    </tbody>
                </Table>
            </Dropdown>
            <Modal show={show} size="lg" onHide={handleClose} dialogClassName='custom-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Captura</Modal.Title>
                </Modal.Header>
                <Modal.Body><img src={`${Constantes.URI}${rutaImg}`} alt="Captura" style={{ width: '100%', height: 'auto' }} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Trazas;
