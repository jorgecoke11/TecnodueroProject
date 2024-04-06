import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function CustomModal(props) {
    const modalContentStyles = {
        width: '100%', // Ancho completo del contenedor
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      };
  return (
    <>
      <Modal show={props.show} onHide={props.onClose} size="xl" style={modalContentStyles}>
        <Modal.Header closeButton> 
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={props.onSave}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;