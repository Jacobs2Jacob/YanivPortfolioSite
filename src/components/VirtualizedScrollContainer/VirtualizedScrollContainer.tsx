import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useEffect,
} from 'react';
import styles from './VirtualizedScrollContainer.module.css';
import { Direction } from '../../types/types';
import { useMouseWheel } from '../../hooks/useMouseWheel';  
import { ScrollRow, ScrollItem } from './ScrollElements';
import { useContainerWidth } from '../../hooks/virtualization/useContainerWidth';
import { useVirtualScroll } from '../../hooks/virtualization/useVirtualScroll';

interface VirtualizedScrollContainerProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    onScrollEnd: () => void;
    onScrollStateChange: (canScrollBack: boolean, canScrollForward: boolean) => void;
    direction: Direction;
    estimateSize?: number;
}

export interface VirtualizedScrollContainerHandles {
    scrollToStart: () => void;
    scrollByOffset: (direction: 'left' | 'right') => void;
}

const VirtualizedScrollContainer = forwardRef<
    VirtualizedScrollContainerHandles,
    VirtualizedScrollContainerProps<any>
>(
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

        const isVertical = direction === 'vertical';
        const { containerRef, width: containerWidth } = useContainerWidth();

        const itemsPerRow = isVertical
            ? Math.max(1, Math.floor(containerWidth / 180))
            : 1;

        const rows = useMemo(() => {
            if (!isVertical) {
                return [items];
            }

            const grouped: any[][] = [];

            for (let i = 0; i < items.length; i += itemsPerRow) {
                grouped.push(items.slice(i, i + itemsPerRow));
            }

            return grouped;
        }, [items, itemsPerRow, isVertical]);

        const { scrollRef, virtualizer, triggerOnReachEnd } = useVirtualScroll({
            items,
            rows,
            isVertical,
            estimateSize,
            onScrollEnd,
        });

        const updateScrollState = useCallback(() => {
            const el = scrollRef.current;

            if (!el) {
                return;
            }

            const scrollPos = isVertical ? el.scrollTop : el.scrollLeft;
            const maxScroll = isVertical
                ? el.scrollHeight - el.clientHeight
                : el.scrollWidth - el.clientWidth;

            const canScrollBack = scrollPos > 1;
            const canScrollForward = scrollPos < (maxScroll - 1);

            onScrollStateChange(canScrollBack, canScrollForward);
        }, [isVertical, onScrollStateChange]);

        useImperativeHandle(ref, () => ({
            scrollToStart() {
                const el = scrollRef.current;

                if (!el) {
                    return;
                }

                el.scrollTo({ [isVertical ? 'top' : 'left']: 0 });
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
            updateScrollState();
        }, [rows.length, items.length, updateScrollState]);

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
                        [isVertical ? 'height' : 'width']: '100%', 
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
                                    <ScrollRow
                                        key={virtualItem.key}
                                        virtualRow={virtualItem}
                                        rowItems={rowItems}
                                        renderItem={renderItem}
                                        itemsPerRow={itemsPerRow}
                                        measureElement={virtualizer.measureElement}
                                    />
                                );
                            } else {
                                const index = virtualItem.index;

                                return (
                                    <ScrollItem
                                        key={virtualItem.key}
                                        virtualItem={virtualItem}
                                        item={items[index]}
                                        index={index}
                                        renderItem={renderItem}
                                        measureElement={virtualizer.measureElement}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
);

export default VirtualizedScrollContainer;