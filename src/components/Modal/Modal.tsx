import React from 'react';
import '../Modal/modal.css';

interface Props {
  isOpen: boolean;
  children: any;
}

const Modal = ({ isOpen, children } : Props) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
