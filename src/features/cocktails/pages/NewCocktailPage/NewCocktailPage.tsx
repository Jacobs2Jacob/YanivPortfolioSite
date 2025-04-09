import React from 'react'; 
import styles from './NewCocktailPage.module.css';
import { useStorageCocktails } from '../../hooks/useStorageCocktails';
import NewCocktailForm from '../../components/NewCocktailForm/NewCocktailForm';
import { Cocktail } from '@/features/cocktails/types';  
import { useModal } from '@/contexts/ModalContext';

const NewCocktailPage: React.FC = () => {
    const { addCocktail } = useStorageCocktails(); 
    const { openModal, closeModal } = useModal();

    const handleOnSubmit = (data: Cocktail) => {
        addCocktail(data);

        openModal(<div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                    <h2>Saved!</h2>
                    <button type='button' onClick={closeModal} 
                            className='btn-blue'
                            style={{ marginTop: '15px' }}>Close</button>
                 </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <h1>Add a New Cocktail</h1>
            <NewCocktailForm onSubmit={handleOnSubmit} />
        </div>
    );
};

export default NewCocktailPage;