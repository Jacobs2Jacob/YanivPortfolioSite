import { useEffect, useMemo, useState } from 'react';
import { searchCocktails } from '../services/cocktailService'; 
import { Cocktail } from '../types';
import { getStorageCocktails } from '../services/storageCocktailService';

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
            .filter(f => f.name.toLowerCase().startsWith(query.toLowerCase()));
         
        return merged;
    }, [query, apiResult]);

    return {
        dataMemoized,
        isLoading
    };
};