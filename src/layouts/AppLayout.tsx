import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SearchBar from '../components/Layout/SearchBar/SearchBar';

const AppLayout: React.FC = () => {

    const navigate = useNavigate();

    return (
        <>
            <SearchBar onSelect={(id)=> navigate(`/cocktail/${id}`)} />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default AppLayout;
