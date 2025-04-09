import { Cocktail } from "../types";
import { generateStorageCocktailId } from "../utils/generateStorageCocktailId";

const STORAGE_KEY = import.meta.env.VITE_COCKTAILS_STORAGE_KEY;
let cachedCocktails: Cocktail[] | null = null;

export const getStorageCocktails = (): Cocktail[] => {

    if (cachedCocktails !== null) {
        return cachedCocktails;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    cachedCocktails = stored ? JSON.parse(stored) : [];
    return cachedCocktails ?? [];
}

export const getStorageCocktailById = (id: string): Cocktail | null => {
    try {
        const cocktail = getStorageCocktails().find(f => f.id === id);
        return cocktail ?? null;
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};

export const addStorageCocktail = (cocktail: Cocktail) => {
    const newCocktails = [...getStorageCocktails(), { ...cocktail, id: generateStorageCocktailId() }];
    cachedCocktails = newCocktails;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCocktails));
}

export const getStorageCocktailsByFirstLetter = (letter: string) => {
    return getStorageCocktails()?.filter(f => f.name.startsWith(letter));
}