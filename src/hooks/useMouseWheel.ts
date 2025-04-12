import { useEffect } from 'react';

interface UseMouseWheelOptions {
    ref: React.RefObject<HTMLElement | null>;
    isVertical: boolean;
    sensitivity?: number;
    onScroll?: () => void;
}

export const useMouseWheel = ({
    ref,
    isVertical,
    sensitivity = 5,
    onScroll,
}: UseMouseWheelOptions) => {
    useEffect(() => {
         
        const el = ref?.current;

        if (!el) {
            return;
        }

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) {
                return;
            }

            e.preventDefault();

            if (isVertical) {
                el.scrollTop += e.deltaY * sensitivity;
            } else {
                el.scrollLeft += e.deltaY * sensitivity;
            }

            onScroll?.();
        };

        el.addEventListener('wheel', handleWheel, { passive: false });

        return () => el.removeEventListener('wheel', handleWheel);

    }, [ref, isVertical, sensitivity, onScroll]);
};