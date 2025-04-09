import React, { useEffect } from 'react';
import styles from './CocktailNavigator.module.css'; 
import Carousel from '@/components/Carousel/Carousel';
import { mapToCarouselItem } from '../../utils/mapToCarouselItem'; 
import { useCocktailAlphabeticQuery } from '../../hooks/useCocktailAlphabeticQuery';

const CocktailNavigator: React.FC = () => {
    const { items, loadNext, loading } = useCocktailAlphabeticQuery();

    useEffect(() => { 
        loadNext();
    }, []);

    return (
        <div className={styles.navigatorContainer}>
            <Carousel
                items={items.map(mapToCarouselItem)}
                onReachEnd={loadNext}
                loading={loading}
            />
        </div>
    );
};

export default React.memo(CocktailNavigator);