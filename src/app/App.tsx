import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/services/queryClient';
import AppRoutes from './routes';

const App = () => (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </QueryClientProvider>
);

export default App;