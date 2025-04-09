
export type DataSource = 'api' | 'storage';

export interface Cocktail {
    id: string;
    name: string;
    image: string;
    instructions: string;
    ingredients: ({
        ingredient: string,
        measure: string
    } | null)[]
}