import { Cocktail } from "../types";
import { mapCocktailFromApi } from "../utils/mapCocktailFromApi";
import cocktailsAPI from "./cocktailApi"; 

export const searchCocktails = async (input: string): Promise<Cocktail[]> => {

    try {
        const res = await cocktailsAPI.get(`/search.php?s=${input}`);
         
        if (Array.isArray(res.data.drinks)) {
            return res.data.drinks.map(mapCocktailFromApi);
        }

        return [];
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};

export const getCocktailsByFirstLetter = async (letter: string): Promise<Cocktail[]> => {

    try {
        const res = await cocktailsAPI.get(`/search.php?f=${letter}`);
        
        if (Array.isArray(res.data.drinks)) {
            return res.data.drinks.map(mapCocktailFromApi);
        }

        return [];
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};

export const getCocktailById = async (id: string): Promise<Cocktail | null> => {

    try {
        const res = await cocktailsAPI.get(`/lookup.php?i=${id}`);
        return res.data.drinks?.[0] ? mapCocktailFromApi(res.data.drinks[0]) : null;
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};