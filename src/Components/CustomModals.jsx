import React from 'react';
import '../Styles/CustomModal.css';

const CustomModal = ({ show, title, message, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="modal-confirm">Confirmar</button>
          <button onClick={onClose} className="modal-close">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;