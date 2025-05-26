import { useState, useCallback, useEffect } from 'react';
import { queryClient } from '@/services/queryClient';
import { getCocktailsByFirstLetter } from '../services/cocktailService';
import { Cocktail } from '../types'; 
import { getStorageCocktailsByFirstLetter } from '../services/storageCocktailService';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

// currently getting data from both sources (api / storage), can be seperated with hook resolver or datasources param, but for the app needs its overengineering
export const useCocktailAlphabeticQuery = (loadAll: boolean) => {
    const [items, setItems] = useState<Cocktail[]>([]);
    const [letterIndex, setLetterIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
     
    const loadNext = useCallback(async () => {

        // loading or end of the list
        if (loading || letterIndex >= alphabet.length) {
            setHasMore(false);
            return;
        }

        setLoading(true);
        const letter = alphabet[letterIndex];

        const apiCocktails = await queryClient.fetchQuery({
            queryKey: ['cocktailsByFirstLetter', letter],
            queryFn: () => getCocktailsByFirstLetter(letter),
            staleTime: 1000 * 60 * 10, // 10 min relevance,
            gcTime: 1000 * 60 * 10,  // 10 min cache,
        });

        const storageCocktails = getStorageCocktailsByFirstLetter(letter) || [];
        const mergedCocktails = [...apiCocktails, ...storageCocktails];

        setItems((prev) => { 
            return [...prev, ...mergedCocktails];
        });

        // increment letter
        setLetterIndex((prev) => prev + 1);
        setLoading(false);
    }, [loading, letterIndex]);

    useEffect(() => { 
        if (loadAll) {
            loadNext();
        }
    }, [letterIndex]);


    return {
        items,
        hasMore,
        loadNext,
        loading,
    };
};