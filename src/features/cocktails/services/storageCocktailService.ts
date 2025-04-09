import { Cocktail } from "../types";
import { generateStorageCocktailId } from "../utils/generateStorageCocktailId";

const STORAGE_KEY = import.meta.env.VITE_COCKTAILS_STORAGE_KEY;
let cachedCocktails: Cocktail[] | null = null;

export const getStorageCocktails = (): Cocktail[] => {

    if (cachedCocktails) {
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
        console.error("Failed fetching cocktail by id from storage", e);
        return null;
    }
};

export const addStorageCocktail = (cocktail: Cocktail) => {
    try {
        const cocktailToAdd = { ...cocktail, id: generateStorageCocktailId() };
        const newCocktails = [...getStorageCocktails(), cocktailToAdd];
        cachedCocktails = newCocktails;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newCocktails));
        return cocktailToAdd;
    }
    catch (e) {
        console.error("Failed adding cocktail to storage", e);
        return null;
    }
}

export const getStorageCocktailsByFirstLetter = (letter: string) => {
    return getStorageCocktails()?.filter(f => f.name.includes(letter));
}