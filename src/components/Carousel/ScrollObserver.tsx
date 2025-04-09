import React, { useEffect, useRef } from 'react';
import styles from './Carousel.module.css';

interface ScrollObserverProps {
    onReachEnd: () => void;
}

const ScrollObserver: React.FC<ScrollObserverProps> = ({ onReachEnd }) => {

    const observerRef = useRef<HTMLDivElement | null>(null);

    // intersection point detection
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onReachEnd();
                }
            },
            { rootMargin: '200px' }
        );

        const target = observerRef.current;

        if (target) {
            observer.observe(target);
        } 

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [onReachEnd]);

    return <div ref={observerRef} className={styles.observer} />;
};

/**
 * Observer for scroll point (used for loading/fetching more items when reached to bottom)
 */
export default React.memo(ScrollObserver);