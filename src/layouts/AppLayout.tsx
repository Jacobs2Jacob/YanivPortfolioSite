import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SearchBar from '../components/Layout/SearchBar/SearchBar'; 
import Modal from '../components/Layout/Modal/Modal'; 
import Navbar from '../components/Layout/Navbar/Navbar'; 
import { useModal } from '../contexts/ModalContext';

const AppLayout: React.FC = () => {
    const navigate = useNavigate();
    const { closeModal, isOpen, content } = useModal();

    return (
        <>
            <Navbar />
            <SearchBar onSelect={(id) => navigate(`/cocktail/${id}`)} />

            <main>
                <Outlet />
            </main>

            <Modal isOpen={isOpen} onClose={closeModal}>
                {content}
            </Modal>
        </>
    );
};

export default AppLayout;