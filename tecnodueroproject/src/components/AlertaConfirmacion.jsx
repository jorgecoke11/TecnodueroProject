import React from "react";
import Modal from 'react-bootstrap/Modal';
const AlertaConfirmacion = ({ showConfirmacion, handleCloseConfirmacion, message }) => {
    return (
        <>
            <Modal show={showConfirmacion} onHide={handleCloseConfirmacion}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row center">
                        <label>{message}</label>
                        <div className="col">
                            <button className="btn btn-success">SI</button>
                        </div>
                        <div className="col">
                            <button className="btn btn-danger">NO</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default AlertaConfirmacion