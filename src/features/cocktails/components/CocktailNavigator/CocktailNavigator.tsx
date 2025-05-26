import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './CocktailNavigator.module.css'; 
import Carousel, { CarouselHandles } from '@/components/Carousel/Carousel';
import { mapToCarouselItem } from '../../utils/mapToCarouselItem'; 
import { useCocktailAlphabeticQuery } from '../../hooks/useCocktailAlphabeticQuery';
import { useSearchBar } from '@/contexts/SearchBarContext';
import { useCocktailQueryByName } from '../../hooks/useCocktailQueryByName'; 
import { useDebounce } from '@/hooks/useDebounce';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

const CocktailNavigator: React.FC = () => {
    const carouselRef = useRef<CarouselHandles>(null);
    const { searchValue } = useSearchBar();
    const { items: navigatorResults, loadNext, loading: navigatorLoading } = useCocktailAlphabeticQuery();
    const { data: searchResults, isLoading: searchLoading } = useCocktailQueryByName(searchValue);
    const device = useDeviceDetection(1200);
    const [navigatorResultsOffset, setNavigatorResultsOffset] = useState(0);
    const navigatorResultsSize = 20;

    // use debounce only here not inside the hook, since the memo here is also using the search value from the searchBar input
    const debouncedQuery = useDebounce(searchValue, 300);

    // loading next letter cocktails on scroll end
    const onReachEndHandler = useCallback(() => {
        if (!debouncedQuery || debouncedQuery === '') {
            setNavigatorResultsOffset(prevOffset => prevOffset + navigatorResultsSize);
        }
    }, [debouncedQuery]);

    // eager loading all cocktails on initial render
    useEffect(() => { 
        for (var i = 0; i < 25; i++) {
            loadNext();
        }
    }, []);

    useEffect(() => { 
        setNavigatorResultsOffset(0);
        carouselRef.current?.resetScroll();
    }, [debouncedQuery]);
     
    const showingItems = useMemo(() => {
        if (debouncedQuery !== '') {
            return searchResults
                .map(mapToCarouselItem);
        }
        else { 
            return navigatorResults
                .slice(navigatorResultsOffset, navigatorResultsSize)
                .map(mapToCarouselItem);
        }
    }, [debouncedQuery, navigatorResults, searchResults]);

    return (
        <div className={styles.navigatorContainer}>
            <Carousel
                direction={device === 'desktop' ? 'horizontal' : 'vertical'}
                ref={carouselRef}
                items={showingItems}
                onReachEnd={onReachEndHandler}
                loading={searchLoading || navigatorLoading}
            />
        </div>
    );
};

export default React.memo(CocktailNavigator);