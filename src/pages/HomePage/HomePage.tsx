import React from 'react';
import CocktailNavigator from '@/features/cocktails/components/CocktailNavigator/CocktailNavigator';

const HomePage: React.FC = () => {

    const navigate = useNavigate();

    return (
        <>
            <SearchBar />
            <CocktailNavigator />
        </>
    );
};

export default HomePage;