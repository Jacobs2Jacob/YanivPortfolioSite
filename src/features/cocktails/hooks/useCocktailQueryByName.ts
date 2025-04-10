import { useCallback, useEffect, useState } from 'react';
import { searchCocktails } from '../services/cocktailService'; 
import { Cocktail } from '../types';
import { getStorageCocktails } from '../services/storageCocktailService';
import { useDebounce } from '@/hooks/useDebounce';

// currently getting data from both sources (api / storage), can be seperated with hook resolver or datasources param, but for the app needs its overengineering
export const useCocktailQueryByName = (query: string = '', debounce: number = 300) => {
    const debouncedQuery = useDebounce(query, debounce);
    const [data, setData] = useState<Cocktail[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchCocktails = useCallback(async () => {
        if (!debouncedQuery) {
            return [];
        }

        setIsLoading(true);

        const res = await searchCocktails(debouncedQuery);

        const storageCocktails = getStorageCocktails()
            .filter(f => f.name.toLowerCase()
                .includes(debouncedQuery.toLowerCase()));

        const merged = [...res, ...storageCocktails];

        setData(merged);
        setIsLoading(false);
    }, [debouncedQuery]);

    useEffect(() => { 
        fetchCocktails();
    }, [fetchCocktails]); 

    return {
        data,
        isLoading
    };
};