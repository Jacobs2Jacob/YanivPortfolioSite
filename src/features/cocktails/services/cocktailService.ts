import { Cocktail } from "../types";
import { mapCocktailFromApi } from "../utils/mapCocktailFromApi";
import cocktailsAPI from "./cocktailApi"; 

export const searchCocktails = async (input: string): Promise<Cocktail[]> => {

    try {
        const res = await cocktailsAPI.get(`/search.php?s=${input}`);
        return Array.isArray(res.data.drinks) ? res.data.drinks.map(mapCocktailFromApi) : [];
    }
    catch (e) {
        // TODO: Pass to logger
        console.error(`(searchCocktails) Failed searching cocktails by name. input[${input}]`, e);
        throw e;
    }
};

export const getCocktailsByFirstLetter = async (letter: string): Promise<Cocktail[]> => {

    try {
        const res = await cocktailsAPI.get(`/search.php?f=${letter}`);
        return Array.isArray(res.data.drinks) ? res.data.drinks.map(mapCocktailFromApi) : [];
    }
    catch (e) {
        // TODO: Pass to logger
        console.error(`(getCocktailsByFirstLetter) Failed searching cocktails by first letter. input[${letter}]`, e);
        throw e;
    }
};

export const getCocktailById = async (id: string): Promise<Cocktail | null> => {

    try {
        const res = await cocktailsAPI.get(`/lookup.php?i=${id}`);
        return res.data.drinks?.[0] ? mapCocktailFromApi(res.data.drinks[0]) : null;
    }
    catch (e) {
        // TODO: Pass to logger
        console.error(`(getCocktailById) Failed to fetch cocktail by ID. input[${id}]`, e);
        throw e;
    }
};