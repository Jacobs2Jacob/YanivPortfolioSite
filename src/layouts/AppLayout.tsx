import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import SearchBar from '../components/Layout/SearchBar/SearchBar'; 
import Navbar from '../components/Layout/Navbar/Navbar'; 
import { useModal } from '../contexts/ModalContext';
import { SearchBarProvider } from '../contexts/SearchBarContext';
import Loader from '../components/Layout/Loader/Loader';

const LazyModal = lazy(() => import('@/components/Layout/Modal/Modal'));

const AppLayout: React.FC = () => {
    
    const { closeModal, isOpen, content } = useModal();

    
    return (
        <SearchBarProvider>
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Suspense fallback={<Loader />}>
                <LazyModal isOpen={isOpen} onClose={closeModal}>
                    {content}
                </LazyModal>
            </Suspense>
        </SearchBarProvider>
    );
};

export default AppLayout;