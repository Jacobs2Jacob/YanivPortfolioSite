import { Cocktail } from '../types';
import { CarouselItem } from '@/components/Carousel/types';

export const mapToCarouselItem = (cocktail: Cocktail): CarouselItem => ({
    id: cocktail.id,
    label: cocktail.name,
    image: `${cocktail.image}/medium`,
    navigationUrl: `/cocktail/${cocktail.id}`
});
 
