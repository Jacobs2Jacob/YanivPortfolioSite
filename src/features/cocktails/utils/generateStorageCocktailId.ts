
export const generateStorageCocktailId = (): string => {
    const digits = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `user-${digits}`;
};