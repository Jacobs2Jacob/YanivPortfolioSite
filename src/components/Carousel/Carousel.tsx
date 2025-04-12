import React, {
    useState,
    useImperativeHandle,
    forwardRef,
    useRef,
} from 'react';
import styles from './Carousel.module.css';
import { CarouselItem } from './types';
import CarouselCard from './CarouselCard';
import ScrollContainer, { ScrollContainerHandles } from './ScrollContainer';
import Loader from '../Layout/Loader/Loader';

interface CarouselProps {
    items: CarouselItem[];
    onReachEnd: () => void;
    loading?: boolean;
}

export interface CarouselHandles {
    resetScroll: () => void;
}

const Carousel = forwardRef<CarouselHandles, CarouselProps>(({ items, onReachEnd, loading }, ref) => {
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
                {(canScrollLeft || loading) && (
                    <button className={styles.navButton} onClick={() => scrollRef.current?.scrollByOffset('left')}>
                        &lt;
                    </button>
                )}

                <ScrollContainer
                    ref={scrollRef}
                    onScrollEnd={onReachEnd}
                    onScrollStateChange={(left, right) => {
                        setCanScrollLeft(left);
                        setCanScrollRight(right);
                    }}>
                    {items.map(item => (
                        <CarouselCard key={item.id} item={item} />
                    ))}
                </ScrollContainer>

                {(canScrollRight || loading) && (
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