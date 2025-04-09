import React from 'react'; 
import styles from './NewCocktailPage.module.css';
import { useStorageCocktails } from '../../hooks/useStorageCocktails';
import NewCocktailForm from '../../components/NewCocktailForm/NewCocktailForm';
import { Cocktail } from '../../../cocktails/types';
import { useNavigate } from 'react-router-dom';

const NewCocktailPage: React.FC = () => {
    const { addCocktail } = useStorageCocktails();
    const navigate = useNavigate();

    const handleOnSubmit = (data: Cocktail) => {
        addCocktail(data);
        navigate('/');
    }

    return (
        <div className={styles.pageContainer}>
            <h1>Add a New Cocktail</h1>
            <NewCocktailForm onSubmit={handleOnSubmit} />
        </div>
    );
};

export default NewCocktailPage;
