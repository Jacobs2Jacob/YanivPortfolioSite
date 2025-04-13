import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const device = useDeviceDetection();

    return (
        device === 'desktop' ? <nav className={styles.navbar}>
            <div className={styles.container}>
                <button onClick={() => navigate('/')} className={styles.navButton}>
                    Home
                </button>
                <button onClick={() => navigate('/cocktail/new')} className={styles.navButton}>
                    🍸 New Cocktail
                </button>
                <h1 className={styles.title}>
                    COCKTAIL GALLERY
                </h1>
            </div>
        </nav> : <nav className={styles.navbar}>
            <div className={styles.container}>
                <button onClick={() => navigate('/')} className={styles.navButton}>
                    Home
                </button>
                <h1 className={styles.title}>
                    COCKTAIL GALLERY
                </h1>
                <button onClick={() => navigate('/cocktail/new')} className={styles.navButton}>
                    🍸 New Cocktail
                </button>
            </div>
        </nav>
    );
};

export default Navbar;