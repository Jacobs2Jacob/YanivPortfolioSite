import React from 'react';
import CocktailNavigator from '@/features/cocktails/components/CocktailNavigator/CocktailNavigator';

const HomePage: React.FC = () => {

    return (
        <>
            <SearchBar />
            <CocktailNavigator />
        </>
    );
};

export default HomePage;