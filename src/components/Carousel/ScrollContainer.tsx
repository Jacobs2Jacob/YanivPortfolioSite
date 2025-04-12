import {
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
    useCallback,
    ReactNode,
} from 'react';
import styles from './Carousel.module.css';
import { Direction } from '../../types/types';
import { useMouseWheel } from '../../hooks/useMouseWheel';

interface ScrollContainerProps {
    children: ReactNode;
    onScrollEnd: () => void;
    onScrollStateChange: (canScrollBack: boolean, canScrollForward: boolean) => void;
    direction: Direction;
}

export interface ScrollContainerHandles {
    scrollToStart: () => void;
    scrollByOffset: (direction: 'left' | 'right') => void;
}

const ScrollContainer = forwardRef<ScrollContainerHandles, ScrollContainerProps>(
    ({ children, onScrollEnd, onScrollStateChange, direction }, ref) => {

        const scrollRef = useRef<HTMLDivElement>(null);
        const hasReachedEnd = useRef(false);
        const isVertical = direction === 'vertical';

        const triggerOnReachEnd = useCallback(() => {
            const el = scrollRef.current;

            if (!el) {
                return;
            }

            const nearEnd = isVertical
                ? el.scrollTop + el.clientHeight >= el.scrollHeight - 10
                : el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;

            if (nearEnd && !hasReachedEnd.current) {
                hasReachedEnd.current = true;
                onScrollEnd();
            }
            else if (!nearEnd) {
                hasReachedEnd.current = false;
            }
        }, [onScrollEnd, isVertical]);

        const updateScrollState = useCallback(() => {

            if (isVertical) {
                return;
            }

            const el = scrollRef.current;

            if (!el) {
                return;
            }

            const canScrollBack = el.scrollLeft > 0;
            const canScrollForward = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
            onScrollStateChange(canScrollBack, canScrollForward);

        }, [onScrollStateChange, isVertical]);

        const handleScroll = () => {
            triggerOnReachEnd();
            updateScrollState();
        };

        useImperativeHandle(ref, () => ({
            scrollToStart() {
                const el = scrollRef.current;

                if (!el) {
                    return;
                }

                hasReachedEnd.current = false;
                el.scrollTo({ [isVertical ? 'top' : 'left']: 0, behavior: 'auto' });
                updateScrollState();
            },
            scrollByOffset(dir) {
                const el = scrollRef.current;

                if (!el) {
                    return;
                }

                const offset = dir === 'left' ? -el.offsetWidth : el.offsetWidth;
                const target = isVertical ? el.scrollTop + offset : el.scrollLeft + offset;

                el.scrollTo({
                    [isVertical ? 'top' : 'left']: target,
                    behavior: 'smooth',
                });
            },
        }));

        useEffect(() => {
            if (!isVertical) {
                updateScrollState();
            }
        }, [children, updateScrollState, isVertical]);

        useMouseWheel({
            ref: scrollRef,
            isVertical,
            sensitivity: 5,
            onScroll: () => {
                triggerOnReachEnd();
                updateScrollState();
            },
        });

        return (
            <div className={styles.scrollWrapper}>
                <div
                    className={styles.scrollContent}
                    onScroll={handleScroll}
                    ref={scrollRef}>
                    {children}
                </div>
            </div>
        );
    }
);

export default ScrollContainer;