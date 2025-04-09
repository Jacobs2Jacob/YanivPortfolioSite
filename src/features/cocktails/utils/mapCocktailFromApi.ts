import { Cocktail } from '../types';
 
export const mapCocktailFromApi = (api: any): Cocktail => {

    const ingredients = Array.from({ length: 15 })
        .map((_, index) => {
            const ingredient: string = api[`strIngredient${index + 1}`];
            const measure: string = api[`strMeasure${index + 1}`];
            return ingredient ? { ingredient, measure } : null;
        })
        .filter(Boolean);

    return {
        id: api.idDrink,
        name: api.strDrink,
        image: api.strDrinkThumb,
        instructions: api.strInstructions,
        ingredients
    };
};