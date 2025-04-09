import { useEffect, useMemo, useState } from 'react';
import { searchCocktails } from '../services/cocktailService'; 
import { Cocktail } from '../types';
import { getStorageCocktails } from '../services/storageCocktailService';

// currently getting data from both sources (api / storage), can be seperated with hook resolver or datasources param, but for the app needs its overengineering
export const useCocktailQueryByName = (query: string = '') => {
    const [apiResult, setApiResult] = useState<Cocktail[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchCocktails = async () => {
            setIsLoading(true);
            const res = await searchCocktails(query);
            setApiResult(res);
            setIsLoading(false);
        };

        if (query) {
            fetchCocktails();
        }
    }, [query]);

    const dataMemoized = useMemo(() => {

        if (!query) {
            return [];
        }
         
        const storageCocktails = getStorageCocktails();

        // depends on search preffered behaviour
        const merged = [...apiResult, ...storageCocktails]
            .filter(f => f.name.toLowerCase().includes(query.toLowerCase()));
         
        return merged;
    }, [query, apiResult]);

    return {
        dataMemoized,
        isLoading
    };
};