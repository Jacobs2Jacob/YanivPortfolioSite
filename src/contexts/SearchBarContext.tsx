import { createContext, useContext, useState, ReactNode } from 'react';

interface SearchBarContextType {
    searchValue: string;
    setSearchValue: (value: string) => void;
}

const SearchBarContext = createContext<SearchBarContextType | undefined>(undefined);

export const useSearchBar = () => {
    const context = useContext(SearchBarContext);

    if (!context) {
        throw new Error('useSearchBar must be used within a SearchBarProvider');
    }
    return context;
};

interface SearchBarProviderProps {
    children: ReactNode;
}

export const SearchBarProvider = ({ children }: SearchBarProviderProps) => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <SearchBarContext.Provider value={{ searchValue, setSearchValue }}>
            {children}
        </SearchBarContext.Provider>
    );
};