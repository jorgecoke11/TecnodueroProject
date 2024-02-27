import React, { useState } from 'react';

function Dropdown({ children, label, onClick}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    onClick()
  };

  return (
    <div className='mt-3'>
      <button onClick={toggleDropdown} className="btn btn-outline-success">
      + { label}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {children}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
