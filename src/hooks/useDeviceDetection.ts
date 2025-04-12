import { useEffect, useState } from 'react';
import { Device } from '../types/types';

export const useDeviceDetection = (breakpoint: number = 600): Device => {
    const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);

        const updateDevice = () => {
            setDevice(mq.matches ? 'mobile' : 'desktop');
        };

        updateDevice();

        mq.addEventListener('change', updateDevice);
        return () => mq.removeEventListener('change', updateDevice);
    }, [breakpoint]);

    return device;
};