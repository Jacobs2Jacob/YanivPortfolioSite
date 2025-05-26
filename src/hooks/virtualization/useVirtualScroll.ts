import { useVirtualizer } from '@tanstack/react-virtual';
import { useCallback, useRef } from 'react';

export function useVirtualScroll({
    items,
    rows,
    isVertical,
    estimateSize,
    onScrollEnd,
}: {
    items: any[];
    rows: any[][];
    isVertical: boolean;
    estimateSize: number;
    onScrollEnd: () => void;
}) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const hasReachedEnd = useRef(false);

    const virtualizer = useVirtualizer({
        count: isVertical ? rows.length : items.length,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => estimateSize,
        horizontal: !isVertical,
        overscan: 2,
    });

    const triggerOnReachEnd = useCallback(() => {
        const virtualItems = virtualizer.getVirtualItems();

        if (!virtualItems.length) {
            return;
        }

        const lastIndex = virtualItems[virtualItems.length - 1].index;
        const limit = isVertical ? rows.length - 1 : items.length - 1;

        if (lastIndex >= limit && !hasReachedEnd.current) {
            hasReachedEnd.current = true;
            onScrollEnd();
        } else if (lastIndex < limit) {
            hasReachedEnd.current = false;
        }
    }, [virtualizer, rows.length, items.length, onScrollEnd, isVertical]);

    return { scrollRef, virtualizer, triggerOnReachEnd };
}