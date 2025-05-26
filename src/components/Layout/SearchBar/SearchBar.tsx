import React, { useState, useEffect } from 'react';
import styles from './SearchBar.module.css';
import { useSearchBar } from '@/contexts/SearchBarContext';

interface SearchBarProps {
    placeholder?: string;
    onSelect?: (id: string) => void;
    totalDropdownItems?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'Search cocktails...'
}) => {

    const [term, setTerm] = useState('');
    const { setSearchValue } = useSearchBar();
       
    // each keypress
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        return () => {
           setSearchValue('');
        }
    }, []);

    //const { dataMemoized: cocktails } = useCocktailQueryByName(debouncedTerm);
    //const [isOpen, setIsOpen] = useState(false);
    //const dropdownRef = useRef<HTMLDivElement>(null);
    //const blurTimeoutRef = useRef<number | null>(null);

    // clear timeout on unmount
    //useEffect(() => {
        //return () => {
        //    if (blurTimeoutRef.current) {
        //        clearTimeout(blurTimeoutRef.current);
        //    }
        //};
    //}, []);

    //const handleBlur = () => {
    //    blurTimeoutRef.current = window.setTimeout(() => {
    //        if (dropdownRef.current && dropdownRef.current.contains(document.activeElement)) {
    //            return;
    //        }

    //        setIsOpen(false);
    //    }, 200);
    //};

    // item selected
    //const handleSelect = useCallback((item: DropdownItem) => {
    //    if (onSelect) { 
    //        onSelect(item.id);
    //    }

    //    setTerm(item.name);
    //    setIsOpen(false);
    //}, [onSelect]);
     
    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                value={term}
                placeholder={placeholder}
                onChange={handleChange}
                className={styles.input}
                //onFocus={() => setIsOpen(true)}
                //onBlur={handleBlur}
            />

            {/*{isOpen && debouncedTerm && cocktails.length > 0 && (*/}
            {/*    <div ref={dropdownRef}>*/}
            {/*        <Dropdown items={cocktails} onSelect={handleSelect} maxItems={totalDropdownItems} />*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default SearchBar;