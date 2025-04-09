import ReactDOM from 'react-dom/client';
import App from './App';
import '@/styles/main.scss'; 
import { ModalProvider } from '../contexts/ModalContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <ModalProvider>
        <App />
    </ModalProvider>
);