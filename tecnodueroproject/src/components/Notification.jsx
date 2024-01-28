import React, { useState } from 'react';

const Notification = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  const closeNotification = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="notification">
        <p>{message}</p>
        <button onClick={closeNotification}>&times;</button>
      </div>
    )
  );
};

export default Notification;
