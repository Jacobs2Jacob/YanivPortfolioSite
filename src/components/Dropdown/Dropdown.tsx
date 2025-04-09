import React from 'react'; 
import styles from './Dropdown.module.css';

export interface DropdownItem {
    id: string;
    name: string;
    image: string;
}

const Dropdown: React.FC<{
    items: DropdownItem[];
    onSelect: (item: DropdownItem) => void;
    maxItems?: number;
}> = ({
    items,
    onSelect,
    maxItems = 10
}) => {
    return (
        <ul className={styles.dropdown}>
            {items.slice(0, maxItems).map((item) => (
                <li className={styles.resultItem} key={item.id} onClick={()=> onSelect(item)}>
                    {item.image && <img src={item.image} alt={item.name} className={styles.resultImage} />}
                    <span className={styles.resultText}>{item.name}</span>
                </li>
            ))}
        </ul>
    );
};

export default React.memo(Dropdown);