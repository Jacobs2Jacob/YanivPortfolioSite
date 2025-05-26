import React from 'react';

export function ScrollRow<T>({
    virtualRow,
    rowItems,
    renderItem,
    itemsPerRow,
    measureElement,
}: {
    virtualRow: any;
    rowItems: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    itemsPerRow: number;
    measureElement: (el: HTMLElement | null) => void;
}) {
    return (
        <div
            ref={measureElement}
            style={{
                position: 'absolute',
                top: virtualRow.start,
                left: 0,
                width: '100%',
                height: virtualRow.size,
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                boxSizing: 'border-box',
            }}
        >
            {rowItems.map((item, idx) =>
                renderItem(item, virtualRow.index * itemsPerRow + idx)
            )}
        </div>
    );
}

export function ScrollItem<T>({
    virtualItem,
    item,
    index,
    renderItem,
    measureElement,
}: {
    virtualItem: any;
    item: T;
    index: number;
    renderItem: (item: T, index: number) => React.ReactNode;
    measureElement: (el: HTMLElement | null) => void;
}) {
    return (
        <div
            ref={measureElement}
            style={{
                position: 'absolute',
                top: 0,
                left: virtualItem.start,
                width: virtualItem.size,
                height: '100%',
                boxSizing: 'border-box',
            }}
        >
            {renderItem(item, index)}
        </div>
    );
}