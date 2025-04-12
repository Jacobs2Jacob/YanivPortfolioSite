import React from 'react';
import CocktailNavigator from '@/features/cocktails/components/CocktailNavigator/CocktailNavigator';

const HomePage: React.FC = () => {
    return (
        <>
            <h1 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 600 }}>
                🍸 Cocktail Gallery
            </h1>
            <CocktailNavigator />
        </>
    );
};

export default HomePage;