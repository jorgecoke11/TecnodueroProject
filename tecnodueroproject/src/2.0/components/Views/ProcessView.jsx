import React, { useState } from "react";
import EjecutablesViewModel from '../Crud/ViewModels/Ejecutables/EjecutablesViewModel'

const ProcesosView = () => {
  const [activeTab, setActiveTab] = useState("Ejecutables");

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
        <button
          className="tab-item disabled"
          disabled
        >
          Disabled
        </button>
      </div>
      <div className="tabs-content">
        {activeTab === "Ejecutables" && <EjecutablesViewModel></EjecutablesViewModel>}
        {activeTab === "Parametros" && <div>Profile Content</div>}
        {activeTab === "Despliegue" && <div>Contact Content</div>}
        {activeTab === "disabled" && <div>Disabled Content</div>}
      </div>
    </div>
  );
};

export default ProcesosView;
