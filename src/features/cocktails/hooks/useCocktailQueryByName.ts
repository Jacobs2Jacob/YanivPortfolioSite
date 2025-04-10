import { useCallback, useEffect, useState } from 'react';
import { searchCocktails } from '../services/cocktailService'; 
import { Cocktail } from '../types';
import { getStorageCocktails } from '../services/storageCocktailService';

// currently getting data from both sources (api / storage), can be seperated with hook resolver or datasources param, but for the app needs its overengineering
export const useCocktailQueryByName = (query: string = '') => {
    const [data, setData] = useState<Cocktail[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchCocktails = useCallback(async () => {
        if (!query) {
            return [];
        }

        setIsLoading(true);
        
        const res = await searchCocktails(query);

        const storageCocktails = getStorageCocktails()
            .filter(f => f.name.toLowerCase()
                .includes(query.toLowerCase()));

        const merged = [...res, ...storageCocktails];

        setData(merged);
        setIsLoading(false);
    }, [query]);

    useEffect(() => { 
        fetchCocktails();
    }, [fetchCocktails]); 

    return {
        data,
        isLoading
    };
};