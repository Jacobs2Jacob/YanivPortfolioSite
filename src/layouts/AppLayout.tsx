import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar/Navbar'; 
import { useModal } from '../contexts/ModalContext';
import Loader from '../components/Layout/Loader/Loader';
import { SearchBarProvider } from '../contexts/SearchBarContext';

const LazyModal = lazy(() => import('@/components/Layout/Modal/Modal'));

const AppLayout: React.FC = () => {
    
    const { closeModal, isOpen, content } = useModal();

    return (
        <>
            <Navbar />

            <main>
                <SearchBarProvider>
                    <Outlet />
                </SearchBarProvider>
            </main>

            <Suspense fallback={<Loader />}>
                <LazyModal isOpen={isOpen} onClose={closeModal}>
                    {content}
                </LazyModal>
            </Suspense>
        </>
    );
};

export default AppLayout;