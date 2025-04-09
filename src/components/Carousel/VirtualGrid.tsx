import React from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import LazyImage from '@/components/LazyImage/LazyImage';
import styles from './Carousel.module.css'; 
import { CarouselItem } from './types';
 
interface Props {
    items: CarouselItem[];
    columnCount?: number;
    itemHeight?: number;
    itemWidth?: number;
}

const VirtualGrid = ({
    items,
    columnCount = 3,
    itemHeight = 180,
    itemWidth = 120,
}: Props) => {

    const rowCount = Math.ceil(items.length / columnCount);

    const Cell = ({ columnIndex, rowIndex, style }: any) => {

        const index = rowIndex * columnCount + columnIndex;

        if (index >= items.length) {
            return null;
        } 

        const item = items[index];

        return (
            <div style={style} className={styles.card}>
                <LazyImage
                    src={item.image}
                    alt={item.label}
                    className={styles.image}
                />
                <p>{item.label}</p>
            </div>
        );
    };

    return (
        <Grid
            columnCount={columnCount}
            columnWidth={itemWidth}
            height={600}
            rowCount={rowCount}
            rowHeight={itemHeight}
            width={columnCount * itemWidth + 20}
        >
            {Cell}
        </Grid>
    );
}

/**
 * A memoized, virtualized grid of navigator items using react-window.
 * Renders only items that are visible in the viewport for performance.
 */
export default React.memo(VirtualGrid);
