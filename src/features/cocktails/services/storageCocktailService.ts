import { Cocktail } from "../types";
import { generateStorageCocktailId } from "../utils/generateStorageCocktailId";

const STORAGE_KEY = import.meta.env.VITE_COCKTAILS_STORAGE_KEY;
let cachedCocktails: Cocktail[] | null = null;

export const getStorageCocktails = (): Cocktail[] => {

    if (cachedCocktails) {
        return cachedCocktails;
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        cachedCocktails = stored ? JSON.parse(stored) : [];
        return cachedCocktails ?? [];
    }
    catch (e) {
        // TODO: Pass to logger
        console.error('(getStorageCocktails) Error reading from localStorage. Returning empty array.', e);
        return [];
    }
}

export const getStorageCocktailById = (id: string): Cocktail | null => { 
    const cocktail = getStorageCocktails().find(f => f.id === id);
    return cocktail ?? null;
};

export const addStorageCocktail = (cocktail: Cocktail): Cocktail | null => {

    try {
        const cocktailToAdd = { ...cocktail, id: generateStorageCocktailId() };
        const newCocktails = [...getStorageCocktails(), cocktailToAdd];
        cachedCocktails = newCocktails;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newCocktails));

        return cocktailToAdd;
    }
    catch (e) { 
        // TODO: Pass to logger
        console.error(`(addStorageCocktail) Failed adding cocktail to storage. Input: ${JSON.stringify(cocktail)}`, e);
        throw e;
    }
}

export const getStorageCocktailsByFirstLetter = (letter: string): Cocktail[] => { 
    return getStorageCocktails().filter(f => f.name.includes(letter));
}