import React from 'react';
import { useNavigate } from 'react-router';
import CocktailNavigator from '@/features/cocktails/components/CocktailNavigator/CocktailNavigator';

const HomePage: React.FC = () => {

    const navigate = useNavigate();

    return (
        <>
            <SearchBar onSelect={(id) => navigate(`/cocktail/${id}`)} />
            <CocktailNavigator />
        </>
    );
};

export default HomePage;