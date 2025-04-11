import React from 'react';
import styles from './Carousel.module.css';
import { CarouselItem } from './types';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../LazyImage/LazyImage';

interface Props {
    item: CarouselItem;
}

const CarouselCard: React.FC<Props> = ({ item }) => {

    const navigate = useNavigate();

    return (
        <div className={styles.card} onClick={() => item.navigationUrl && navigate(item.navigationUrl)}>
            <LazyImage
                src={item.image}
                alt={item.label}
                className={styles.image}
            />
            <p className={styles.label}>{item.label}</p>
        </div>
    );
};

export default React.memo(CarouselCard);