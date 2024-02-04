import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Button  from './Button'

const DropDownComponent = (props) => {
  const { options, label } = props;
  const [selectedOption, setSelectedOption] = useState('');
  const [boton, setBoton ] = useState('')
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setBoton(<Button></Button>)
  };

  return (
    <div className='container mt-5'>
      <h2 className='mb-4'>{label}</h2>
      <label htmlFor='dropdown'>Selecciona una opción:</label>
      <select
        className='form-control'
        id='dropdown'
        onChange={handleSelectChange}
        value={selectedOption}
      >
        <option value="" disabled></option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <div className="mt-3">
        <p>Opción seleccionada: {selectedOption}</p>
      </div>
      {boton}
    </div>
  );
};

export default DropDownComponent;
