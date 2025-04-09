import React, { useRef, useCallback, useState, useEffect } from 'react';
import styles from './Carousel.module.css';
import { CarouselItem } from './types';
import CarouselCard from './CarouselCard';

interface CarouselProps {
    items: CarouselItem[];
    onReachEnd: () => void;
    loading?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ items, onReachEnd, loading }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {console.log(items) },[])

    const updateScrollButtons = useCallback(() => {
        const el = scrollRef.current;

        if (!el) {
            return;
        }

        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }, []);

    // set navigation btns visibility
    useEffect(() => {
        updateScrollButtons();
    }, [items.length, updateScrollButtons]);

    const scroll = useCallback((direction: 'left' | 'right') => {

        if (!scrollRef.current) {
            return;
        } 

        const { scrollLeft, offsetWidth } = scrollRef.current;
        const scrollAmount = direction === 'left' ? -offsetWidth : offsetWidth;

        scrollRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: 'smooth' });
    }, []);

    const handleScroll = useCallback(() => {
        const el = scrollRef.current;

        if (!el) {
            return;
        } 

        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
            onReachEnd();
        }

        updateScrollButtons();
    }, [onReachEnd, updateScrollButtons]);

    return (
        <div className={styles.carouselWrapper}>
            {canScrollLeft && (
                <button className={styles.navButton} onClick={() => scroll('left')}>&lt;</button>
            )}

            <div className={styles.carousel} ref={scrollRef} onScroll={handleScroll}>
                {items.map((item) => <CarouselCard key={item.id} item={item} />)}
            </div>

            {canScrollRight && (
                <button className={styles.navButton} onClick={() => scroll('right')}>&gt;</button>
            )}

            {loading && <p className={styles.loading}>Loading more...</p>}
        </div>
    );
};

export default React.memo(Carousel);