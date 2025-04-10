import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './CocktailNavigator.module.css'; 
import Carousel, { CarouselHandles } from '@/components/Carousel/Carousel';
import { mapToCarouselItem } from '../../utils/mapToCarouselItem'; 
import { useCocktailAlphabeticQuery } from '../../hooks/useCocktailAlphabeticQuery';
import { useSearchBar } from '@/contexts/SearchBarContext';
import { useCocktailQueryByName } from '../../hooks/useCocktailQueryByName'; 

const CocktailNavigator: React.FC = () => {
    const carouselRef = useRef<CarouselHandles>(null);
    const { searchValue } = useSearchBar();
    const { items: navigatorResults, loadNext, loading: navigatorLoading } = useCocktailAlphabeticQuery();
    const { data: searchResults, isLoading: searchLoading } = useCocktailQueryByName(searchValue, 150);
     
    const onReachEndHandler = useCallback(() => {
        if (!searchValue || searchValue === '') {
            loadNext();
        }
    }, [searchValue, loadNext]);
     
    useEffect(() => { 
        loadNext();
    }, []);

    useEffect(() => {
        carouselRef.current?.resetScroll();
    }, [searchValue, searchResults]);
     
    const showingItems = useMemo(() => {
        if (searchValue !== '') {
            return searchResults.map(mapToCarouselItem);
        }
        else {
            return navigatorResults.map(mapToCarouselItem);
        }
    }, [searchValue, navigatorResults, searchResults]);

    return (
        <div className={styles.navigatorContainer}>
            <Carousel
                ref={carouselRef}
                items={showingItems}
                onReachEnd={onReachEndHandler}
                loading={searchLoading || navigatorLoading}
            />
        </div>
    );
};

export default React.memo(CocktailNavigator);