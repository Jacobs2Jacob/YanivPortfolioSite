import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <button onClick={() => navigate('/')} className={styles.navButton}>
                    Home
                </button>
                <button onClick={() => navigate('/cocktail/new')} className={styles.navButton}>
                    Create New Cocktail
                </button>
            </div>
        </nav>
    );
};

export default Navbar;