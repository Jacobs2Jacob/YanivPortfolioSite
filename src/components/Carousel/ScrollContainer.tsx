import {
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
    useCallback,
    ReactNode,
    UIEventHandler,
} from 'react';
import styles from './Carousel.module.css';

interface ScrollContainerProps {
    children: ReactNode;
    onScrollEnd: () => void;
    onScrollStateChange: (canScrollLeft: boolean, canScrollRight: boolean) => void;
}

export interface ScrollContainerHandles {
    scrollToStart: () => void;
    scrollByOffset: (direction: 'left' | 'right') => void;
}

const ScrollContainer = forwardRef<ScrollContainerHandles, ScrollContainerProps>(
    ({ children, onScrollEnd, onScrollStateChange }, ref) => {
        const scrollRef = useRef<HTMLDivElement>(null);
        const hasReachedEnd = useRef(false);

        const updateScrollState = useCallback(() => {
            const el = scrollRef.current;

            if (!el) {
                return;
            }

            onScrollStateChange(
                el.scrollLeft > 0,
                el.scrollLeft + el.clientWidth < el.scrollWidth - 1
            );
        }, [onScrollStateChange]);

        const handleScroll: UIEventHandler<HTMLDivElement> = () => {
            const el = scrollRef.current;

            if (!el) {
                return;
            }

            const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;

            if (nearEnd && !hasReachedEnd.current) {
                hasReachedEnd.current = true;
                onScrollEnd();
            } else if (!nearEnd) {
                hasReachedEnd.current = false;
            }

            updateScrollState();
        };

        useImperativeHandle(ref, () => ({
            scrollToStart() {
                hasReachedEnd.current = false;
                scrollRef.current?.scrollTo({ left: 0, behavior: 'auto' });
                updateScrollState();
            },
            scrollByOffset(direction: 'left' | 'right') {
                const el = scrollRef.current;

                if (!el) {
                    return;
                }

                const offset = direction === 'left' ? -el.offsetWidth : el.offsetWidth;
                el.scrollTo({ left: el.scrollLeft + offset, behavior: 'smooth' });
            },
        }));

        useEffect(() => {
            updateScrollState();
        }, [children, updateScrollState]);

        return (
            <div className={styles.scrollWrapper}>
                <div className={styles.scrollContent} onScroll={handleScroll} ref={scrollRef}>
                    {children}
                </div>
            </div>
        );
    }
);

export default ScrollContainer;