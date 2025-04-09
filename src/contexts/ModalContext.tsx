import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
    content: ReactNode | null;
    isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);

    // throw if not wrapped with provider
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    
    return context;
};

// compound pattern
export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<ReactNode | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (modalContent: ReactNode) => {
        setContent(modalContent);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setContent(null);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal, content, isOpen }}>
            {children}
        </ModalContext.Provider>
    );
};