import React, { useState, useEffect } from "react";

const ModalComponent = ({ children, isOpen, onClose, label }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);
  const [modalOpacity, setModalOpacity] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setModalOpen(true);
      // Utilizamos setTimeout para asegurarnos de que la opacidad se actualice después de que el modal esté abierto
      setTimeout(() => {
        setModalOpacity(1);
      }, 100);
    } else {
      // Si el modal está cerrado, ajustamos la opacidad a 0 antes de cerrarlo
      setModalOpacity(0);
      // Después de la animación, cerramos el modal
      setTimeout(() => {
        setModalOpen(false);
      }, 300);
    }
  }, [isOpen]);

  const handleClose = () => {
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
    opacity: modalOpacity,
    transition: "opacity 0.3s ease-in-out",
  };

  const modalContentStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <div className="border-bottom">
          <h1 >{label}</h1>
        </div>
        {children}
        <button onClick={handleClose} className="mt-2" style={{ backgroundColor: "#555", color: "#fff", border: "none", padding: "10px 15px", borderRadius: "5px" }}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalComponent;
