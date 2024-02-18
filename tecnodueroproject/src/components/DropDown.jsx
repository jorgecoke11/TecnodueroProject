import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Button  from './Button'

const DropDownComponent = (props) => {
  const { options, label, onSelectChange} = props;
  const [selectedOption, setSelectedOption] = useState('');
  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
    onSelectChange(event.target.value)
  };

  return (
    <div className='container mt-5'>
      <h2 className='mb-4'>{label}</h2>
      <label htmlFor='dropdown'>Selecciona una opción:</label>
      <select
        className='form-control'
        id='dropdown'
        onChange={handleSelect}
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
    </div>
  );
};

export default DropDownComponent;
