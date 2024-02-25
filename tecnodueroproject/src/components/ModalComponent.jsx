import React, { useState, useEffect } from "react";

const ModalComponent = ({ children, isOpen, onClose }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setModalOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const modalStyles = {
    display: modalOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    transition: "opacity 0.3s ease-in-out", // Animación de opacidad
  };

  const modalContentStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Sombra sutil
    display: "flex", // Cambiar a "flex" para mostrar en filas
    flexDirection: "column", // Cambiar a "column" para mostrar en columnas
    alignItems: "center", // Alinear verticalmente
    justifyContent: "space-between", // Distribuir horizontalmente
  };

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        {children}
        <button onClick={handleClose} style={{ backgroundColor: "#555", color: "#fff", border: "none", padding: "10px 15px", borderRadius: "5px" }}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalComponent;
