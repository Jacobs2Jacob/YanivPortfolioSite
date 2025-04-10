import React, { useRef, useCallback, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import styles from './Carousel.module.css';
import { CarouselItem } from './types';
import CarouselCard from './CarouselCard';

interface CarouselProps {
    items: CarouselItem[];
    onReachEnd: () => void;
    loading?: boolean;
}
export interface CarouselHandles {
    resetScroll: () => void;
}

// forward component ref to parent
const Carousel = forwardRef<CarouselHandles, CarouselProps>(({
    items,
    onReachEnd,
    loading
}, ref) => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const hasReachedEnd = useRef(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => { console.log(loading)}, [loading])

    const updateScrollButtons = useCallback(() => {
        const el = scrollRef.current;

        if (!el) {
            return;
        }

        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }, []);

    const resetScroll = useCallback(() => {
        hasReachedEnd.current = false;
        scrollRef.current?.scrollTo({ left: 0, behavior: 'auto' });
        updateScrollButtons();
    }, [updateScrollButtons]);

    useImperativeHandle(ref, () => ({ resetScroll }));

    useEffect(() => {
        updateScrollButtons();
    }, [items.length]);

    // smooth scrolling
    const scroll = (dir: 'left' | 'right') => {
        const el = scrollRef.current;

        if (!el) {
            return;
        }

        const offset = dir === 'left' ? -el.offsetWidth : el.offsetWidth;
        el.scrollTo({ left: el.scrollLeft + offset, behavior: 'smooth' });
    };

    const handleScroll = () => {

        const el = scrollRef.current;

        if (!el) {
            return;
        }

        const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;

        // check if end so trigger fetch more at parent
        if (nearEnd && !hasReachedEnd.current) {
            hasReachedEnd.current = true;
            onReachEnd();
        }
        else if (!nearEnd) {
            hasReachedEnd.current = false;
        }

        updateScrollButtons();
    };

    if (items.length === 0 && !loading) {
        return <p className={styles.loading}>No Results Found...</p>;
    }

    if (loading) {
        return <p className={styles.loading}>Searching...</p>;
    }

    return (
        items.length > 0 &&
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
            </div>
    );
});

export default React.memo(Carousel);