import React from 'react';
import styles from './Modal.module.css';
import ReactDOM from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {

    if (!isOpen) {
        return null;
    } 
     
    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
};

export default Modal;