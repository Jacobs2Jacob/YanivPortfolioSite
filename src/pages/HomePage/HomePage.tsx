import React from 'react';
import CocktailNavigator from '@/features/cocktails/components/CocktailNavigator/CocktailNavigator';
import SearchBar from '@/components/Layout/SearchBar/SearchBar';

const HomePage: React.FC = () => {

    return (
        <>
            <SearchBar />
            <CocktailNavigator />
        </>
    );
};

export default HomePage;