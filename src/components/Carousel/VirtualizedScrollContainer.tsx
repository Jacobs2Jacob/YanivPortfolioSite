import {
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
    useCallback,
    useMemo,
    useState,
} from 'react';
import styles from './Carousel.module.css';
import { Direction } from '../../types/types';
import { useMouseWheel } from '../../hooks/useMouseWheel';
import { useVirtualizer } from '@tanstack/react-virtual';

interface ScrollContainerProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    onScrollEnd: () => void;
    onScrollStateChange: (canScrollBack: boolean, canScrollForward: boolean) => void;
    direction: Direction;
    estimateSize?: number; // height of a row in vertical, or width of item in horizontal
}

export interface ScrollContainerHandles {
    scrollToStart: () => void;
    scrollByOffset: (direction: 'left' | 'right') => void;
}

const ScrollContainer = forwardRef<ScrollContainerHandles, ScrollContainerProps<any>>(
    (
        {
            items,
            renderItem,
            onScrollEnd,
            onScrollStateChange,
            direction,
            estimateSize = direction === 'vertical' ? 250 : 270,
        },
        ref
    ) => {
        const scrollRef = useRef<HTMLDivElement>(null);
        const containerRef = useRef<HTMLDivElement>(null);
        const hasReachedEnd = useRef(false);
        const isVertical = direction === 'vertical';

        // Track container width for auto-calculating items per row
        const [containerWidth, setContainerWidth] = useState(0);

        useEffect(() => {
            if (!containerRef.current) return;

            const observer = new ResizeObserver(([entry]) => {
                setContainerWidth(entry.contentRect.width);
            });

            observer.observe(containerRef.current);

            return () => {
                if (containerRef.current) observer.unobserve(containerRef.current);
            };
        }, []);

        // Auto-calc itemsPerRow in vertical mode; horizontal = 1 (virtualize items individually)
        const itemsPerRow = isVertical
            ? Math.max(1, Math.floor(containerWidth / 180))
            : 1;

        // Group items into rows for vertical mode; horizontal is single row array with all items
        const rows = useMemo(() => {
            if (!isVertical) return [items]; // horizontal: one row with all items

            const grouped: any[][] = [];
            for (let i = 0; i < items.length; i += itemsPerRow) {
                grouped.push(items.slice(i, i + itemsPerRow));
            }
            return grouped;
        }, [items, itemsPerRow, isVertical]);

        // Virtualizer count: rows for vertical, items for horizontal
        const virtualizer = useVirtualizer({
            count: isVertical ? rows.length : items.length,
            getScrollElement: () => scrollRef.current,
            estimateSize: () => estimateSize,
            horizontal: !isVertical,
            overscan: 2,
        });

        const triggerOnReachEnd = useCallback(() => {
            const virtualItems = virtualizer.getVirtualItems();
            if (!virtualItems.length) return;

            const lastIndex = virtualItems[virtualItems.length - 1].index;
            const limit = isVertical ? rows.length - 1 : items.length - 1;

            if (lastIndex >= limit && !hasReachedEnd.current) {
                hasReachedEnd.current = true;
                onScrollEnd();
            } else if (lastIndex < limit) {
                hasReachedEnd.current = false;
            }
        }, [rows.length, items.length, onScrollEnd, virtualizer, isVertical]);

        const updateScrollState = useCallback(() => {
            const el = scrollRef.current;
            if (!el) return;

            const scrollPos = isVertical ? el.scrollTop : el.scrollLeft;
            const maxScroll = isVertical
                ? el.scrollHeight - el.clientHeight
                : el.scrollWidth - el.clientWidth;

            onScrollStateChange(scrollPos > 0, scrollPos < maxScroll);
        }, [isVertical, onScrollStateChange]);

        useImperativeHandle(ref, () => ({
            scrollToStart() {
                const el = scrollRef.current;
                if (!el) return;

                hasReachedEnd.current = false;
                el.scrollTo({ [isVertical ? 'top' : 'left']: 0 });
                updateScrollState();
            },
            scrollByOffset(dir) {
                const el = scrollRef.current;
                if (!el) return;

                const offset = dir === 'left' ? -el.offsetWidth : el.offsetWidth;
                const target = isVertical ? el.scrollTop + offset : el.scrollLeft + offset;

                el.scrollTo({
                    [isVertical ? 'top' : 'left']: target,
                    behavior: 'smooth',
                });
            },
        }));

        useEffect(() => {
            updateScrollState();
        }, [rows.length, items.length]);

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
            <div ref={containerRef} className={styles.scrollWrapper}>
                <div
                    ref={scrollRef}
                    className={styles.scrollContent}
                    onScroll={() => {
                        triggerOnReachEnd();
                        updateScrollState();
                    }}
                    style={{
                        overflow: isVertical ? 'auto hidden' : 'hidden auto',
                        [isVertical ? 'height' : 'width']: '100%',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            height: isVertical ? `${virtualizer.getTotalSize()}px` : '100%',
                            width: !isVertical ? `${virtualizer.getTotalSize()}px` : '100%',
                            position: 'relative',
                        }}
                    >
                        {virtualizer.getVirtualItems().map((virtualItem) => {
                            if (isVertical) {
                                const rowItems = rows[virtualItem.index];
                                return (
                                    <div
                                        key={virtualItem.key}
                                        ref={virtualizer.measureElement}
                                        style={{
                                            position: 'absolute',
                                            top: virtualItem.start,
                                            left: 0,
                                            width: '100%',
                                            height: virtualItem.size,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            boxSizing: 'border-box',
                                        }}
                                    >
                                        {rowItems.map((item, idx) =>
                                            renderItem(item, virtualItem.index * itemsPerRow + idx)
                                        )}
                                    </div>
                                );
                            } else {
                                const index = virtualItem.index;
                                return (
                                    <div
                                        key={virtualItem.key}
                                        ref={virtualizer.measureElement}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: virtualItem.start,
                                            width: virtualItem.size,
                                            height: '100%',
                                            boxSizing: 'border-box',
                                        }}
                                    >
                                        {renderItem(items[index], index)}
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
);

export default ScrollContainer;