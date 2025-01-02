import React, { useState, useEffect } from "react";
import EjecutablesViewModel from '../Crud/ViewModels/Ejecutables/EjecutablesViewModel';
import { useParams } from "react-router-dom";

const ProcesosView = () => {
  const { idRobot, tab } = useParams();
  
  const [activeTab, setActiveTab] = useState(tab || "Ejecutables");

  useEffect(() => {
    // Si el parámetro 'tab' cambia en la URL, actualizar la pestaña activa.
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs-container">
      <div className="tabs-nav">
        <button
          className={`tab-item ${activeTab === "Ejecutables" ? "active" : ""}`}
          onClick={() => handleTabChange("Ejecutables")}
        >
          Ejecutables
        </button>
        <button
          className={`tab-item ${activeTab === "Parametros" ? "active" : ""}`}
          onClick={() => handleTabChange("Parametros")}
        >
          Parámetros
        </button>
        <button
          className={`tab-item ${activeTab === "Despliegue" ? "active" : ""}`}
          onClick={() => handleTabChange("Despliegue")}
        >
          Despliegue
        </button>
        <button className="tab-item" disabled>
          Disabled
        </button>
      </div>
      <div className="tabs-content">
        {activeTab === "Ejecutables" && <EjecutablesViewModel idProcess={idRobot} activeTab={activeTab}/>}
        {activeTab === "Parametros" && <div>Parámetros Content</div>}
        {activeTab === "Despliegue" && <div>Despliegue Content</div>}
      </div>
    </div>
  );
};

export default ProcesosView;
