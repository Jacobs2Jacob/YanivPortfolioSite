import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import styles from './CocktailDetailPage.module.css'; 
import { Cocktail } from '../../types'; 
import { useCocktailById } from '../../hooks/useCocktailById';

const CocktailDetailPage: React.FC = () => {
    const { id } = useParams();
    const [cocktail, setCocktail] = useState<Cocktail>();
    const { data, error, isLoading } = useCocktailById({ id: id!, dataSource: id!.includes('user-') ? 'storage' : 'api' });

    useEffect(() => {
        if (data) {
            setCocktail(data);
        }
    }, [data])

    if (isLoading) {
        return <p className={styles.loading}>Loading cocktail...</p>;
    }

    if (error) {
        return <p className={styles.error}>Cocktail not found.</p>;
    }

    return (
        cocktail && <div className={styles.container}>
            <h1 className={styles.title}>{cocktail.name}</h1>

            <img
                src={cocktail.image}
                alt={cocktail.name}
                className={styles.image}
            />

            <h2>Ingredients</h2>
            <ul>
                {cocktail.ingredients && cocktail.ingredients.map((item) => (
                    item?.ingredient && <li key={item.ingredient}>
                        {item.measure} {item.ingredient}
                    </li>
                ))}
            </ul>

            <h2>Instructions</h2>
            <p>{cocktail.instructions}</p>
        </div>
    );
};

export default CocktailDetailPage;