import React from 'react';
import CocktailNavigator from '@/features/cocktails/components/CocktailNavigator/CocktailNavigator';
import SearchBar from '@/components/layout/SearchBar/SearchBar';

const HomePage: React.FC = () => {

    return (
        <>
            <SearchBar />
            <CocktailNavigator />
        </>
    );
};

export default HomePage;