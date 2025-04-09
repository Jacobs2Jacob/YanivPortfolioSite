import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

// 1. Create a QueryClient
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 min
            gcTime: 5 * 60 * 1000,
        },
    },
});

// 2. Create a persister using localStorage
const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
});

// 3. Set up persistence
persistQueryClient({
    queryClient,
    persister: localStoragePersister,
    maxAge: 5 * 60 * 1000
});