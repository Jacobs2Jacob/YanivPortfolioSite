import React, { useState, useCallback, useRef } from 'react';
import styles from './SearchBar.module.css';
import { useDebounce } from '@/hooks/useDebounce';
import { useClickOutside } from '../../../hooks/useClickOutside';
import Dropdown from '../../Dropdown/Dropdown'; 
import { useCocktailQueryByName } from '../../../features/cocktails/hooks/useCocktailQueryByName';

interface SearchBarProps {
    placeholder?: string;
    onSelect?: (id: string) => void;
    totalDropdownItems?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'Search cocktails...',
    onSelect,
    totalDropdownItems = 10
}) => {

    const [term, setTerm] = useState('');
    const debouncedTerm = useDebounce(term, 300);
    const { dataMemoized: cocktails } = useCocktailQueryByName(debouncedTerm); 
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useClickOutside(dropdownRef, () => {
        setIsOpen(false);
    });

    // item selected
    const handleSelect = useCallback((id: string) => {
        if (onSelect) {
            onSelect(id);
        }

        setIsOpen(false);
    }, [onSelect]);

    // each keypress
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
    };
     
    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                value={term}
                placeholder={placeholder}
                onChange={handleChange}
                className={styles.input}
                onFocus={()=> setIsOpen(true)}
            />

            {isOpen && debouncedTerm && cocktails.length > 0 && (
                <div ref={dropdownRef}>
                    <Dropdown items={cocktails} onSelect={handleSelect} maxItems={totalDropdownItems} />
                </div>
            )}
        </div>
    );
};

export default SearchBar;