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
    const { items: navigatorResults, loading: navigatorLoading, hasMore } = useCocktailAlphabeticQuery(true);
    const { data: searchResults, isLoading: searchLoading } = useCocktailQueryByName(searchValue);
    const device = useDeviceDetection(1200);
    const navigatorResultsSize = 20;
    const [navigatorResultsOffset, setNavigatorResultsOffset] = useState(navigatorResultsSize);
    
    // use debounce only here not inside the hook, since the memo here is also using the search value from the searchBar input
    const debouncedQuery = useDebounce(searchValue, 300);

    // rendering next letter cocktails on scroll end
    const onReachEndHandler = useCallback(() => {
        if (!debouncedQuery || debouncedQuery === '') {
            setNavigatorResultsOffset(prevOffset => prevOffset + navigatorResultsSize);
        }
    }, [debouncedQuery]);
      
    useEffect(() => { 

        // reset offset when search query is empty
        if (debouncedQuery && debouncedQuery !== '') {
            setNavigatorResultsOffset(navigatorResultsSize);
        }

        carouselRef.current?.resetScroll();
    }, [debouncedQuery]);
     
    const showingItems = useMemo(() => {
        if (debouncedQuery !== '') {
            return searchResults
                .map(mapToCarouselItem);
        }
        else { 
            return navigatorResults
                .slice(0, navigatorResultsOffset)
                .map(mapToCarouselItem);
        }
    }, [
        debouncedQuery,
        navigatorResults,
        searchResults,
        navigatorResultsOffset
    ]);

    return (
        <div className={styles.navigatorContainer}>
            <Carousel
                direction={device === 'desktop' ? 'horizontal' : 'vertical'}
                ref={carouselRef}
                items={!hasMore ? showingItems : []}
                onReachEnd={onReachEndHandler}
                loading={searchLoading || navigatorLoading}
            />
        </div>
    );
};

export default React.memo(CocktailNavigator);