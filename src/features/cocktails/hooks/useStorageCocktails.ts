import { useCallback, useEffect, useState } from 'react';  
import { addStorageCocktail, getStorageCocktails } from '../services/storageCocktailService';
import { Cocktail } from '../types';

export const useStorageCocktails = () => {
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);

    // Load cocktails from storage on mount
    useEffect(() => {
        const storedCocktails = getStorageCocktails();
        setCocktails(storedCocktails);
    }, []);

    // Add cocktail and update state
    const addCocktail = useCallback((cocktail: Cocktail) => {
        const storageCocktail = addStorageCocktail(cocktail);

        if (storageCocktail) {
            const updated = getStorageCocktails();
            setCocktails(updated);
            return updated;
        }
        else {
            return null;
        }
    }, []);

    return {
        cocktails,
        addCocktail
    };
};