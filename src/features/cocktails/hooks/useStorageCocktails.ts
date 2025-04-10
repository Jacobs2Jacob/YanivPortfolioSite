import { useCallback, useEffect, useState } from 'react';  
import { addStorageCocktail, getStorageCocktails } from '../services/storageCocktailService';
import { Cocktail } from '../types';

export const useStorageCocktails = () => {
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Load cocktails from storage on mount
    useEffect(() => {
        const storedCocktails = getStorageCocktails();
        setCocktails(storedCocktails);
    }, []);

    // Add cocktail and update state
    const addCocktail = useCallback((cocktail: Cocktail): boolean => {

        setIsLoading(true);
        setError(null);

        try {
            const storageCocktail = addStorageCocktail(cocktail);

            if (storageCocktail) {
                const updated = getStorageCocktails();
                setCocktails(updated);
                return true;
            }
        }
        catch (e) {
            setError('Failed to add cocktail');
        }
        finally {
            setIsLoading(false);
        }

        return false;
    }, []);

    return {
        cocktails,
        addCocktail,
        error,
        isLoading
    };
};