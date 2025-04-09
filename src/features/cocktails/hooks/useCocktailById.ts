import { useState, useEffect } from 'react'; 
import { getCocktailById } from '../services/cocktailService';
import { Cocktail, DataSource } from '../types';
import { getStorageCocktailById } from '../services/storageCocktailService';
 
interface UseCocktailByIdProps {
  id: string;
  dataSource?: DataSource;
}

export const useCocktailById = ({ id, dataSource = 'api' }: UseCocktailByIdProps) => {
  const [data, setData] = useState<Cocktail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
        return;
    }

    const fetchCocktail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let cocktail: Cocktail | null = null;

        if (dataSource === 'api') {
          cocktail = await getCocktailById(id);
        }
        else {
          cocktail = await getStorageCocktailById(id);
        }

        if (!cocktail) {
          setError('Cocktail not found');
          setData(null);
        }
        else {
          setData(cocktail);
        }
      }
      catch (err) {
        setError('Failed to fetch cocktail details');
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchCocktail();
  }, [id, dataSource]);

  return { data, isLoading, error };
};