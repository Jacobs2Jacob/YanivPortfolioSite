import React, {
    useState,
    useImperativeHandle,
    forwardRef,
    useRef,
} from 'react';
import styles from './Carousel.module.css';
import { CarouselItem } from './types';
import CarouselCard from './CarouselCard';
import ScrollContainer, { ScrollContainerHandles } from './VirtualizedScrollContainer';
import Loader from '../Layout/Loader/Loader';
import { Direction } from '../../types/types';

interface CarouselProps {
    items: CarouselItem[];
    onReachEnd: () => void;
    loading?: boolean;
    direction?: Direction;
}

export interface CarouselHandles {
    resetScroll: () => void;
}

const Carousel = forwardRef<CarouselHandles, CarouselProps>(({
    items,
    onReachEnd,
    loading,
    direction = 'horizontal'
}, ref) => {
    const scrollRef = useRef<ScrollContainerHandles>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    
    useImperativeHandle(ref, () => ({
        resetScroll: () => {
            scrollRef.current?.scrollToStart();
        },
    }));

    return (
        <div className={styles.carouselWrapper}>
            {items.length > 0 && <>
                {direction === 'horizontal' && (canScrollLeft || loading) && (
                    <button className={styles.navButton} onClick={() => scrollRef.current?.scrollByOffset('left')}>
                        &lt;
                    </button>
                )}

                <ScrollContainer
                    direction={direction}       
                    ref={scrollRef}
                    items={items}
                    renderItem={(item) => (
                        <CarouselCard key={item.id} item={item} />
                    )}
                    onScrollEnd={onReachEnd}
                    onScrollStateChange={(left, right) => {
                        setCanScrollLeft(left);
                        setCanScrollRight(right);
                    }}> 
                </ScrollContainer>

                {direction === 'horizontal' && (canScrollRight || loading) && (
                    <button className={styles.navButton} onClick={() => scrollRef.current?.scrollByOffset('right')}>
                        &gt;
                    </button>
                )}
            </>}
             
            {!loading && items.length === 0 && (
                <p className={styles.loading}>No Results Found...</p>
            )}

            {loading && items.length === 0 && (
                <Loader />
            )}
        </div>
    );
});

export default React.memo(Carousel);