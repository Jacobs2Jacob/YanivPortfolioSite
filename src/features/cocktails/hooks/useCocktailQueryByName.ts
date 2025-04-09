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
        } else {
            setApiResult([]);
        }
    }, [query]);

    const dataMemoized = useMemo(() => {
        if (!query) {
            return [];
        }

        const storageCocktails = getStorageCocktails().filter(c =>
            c.name.toLowerCase().includes(query.toLowerCase())
        );

        const merged = [...apiResult, ...storageCocktails];

        // Deduplicate cocktails based on their id
        const uniqueCocktails = Array.from(
            merged.reduce((map, cocktail) => map.set(cocktail.id, cocktail), new Map<string, Cocktail>()).values()
        );

        return uniqueCocktails;
    }, [query, apiResult]);

    return {
        dataMemoized,
        isLoading
    };
};