import React from 'react'; 
import styles from './NewCocktailPage.module.css';
import { useStorageCocktails } from '../../hooks/useStorageCocktails';
import NewCocktailForm from '../../components/NewCocktailForm/NewCocktailForm';
import { Cocktail } from '@/features/cocktails/types';  
import { useModal } from '@/contexts/ModalContext';
import { useNavigate } from 'react-router';

const NewCocktailPage: React.FC = () => {
    const { addCocktail } = useStorageCocktails(); 
    const { openModal, closeModal } = useModal();
    const navigate = useNavigate();

    const handleOnSubmit = (data: Cocktail) => {
        const addedCocktail = addCocktail(data);

        // success
        if (addedCocktail) {
            openModal(<div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h2>Saved!</h2>
                <button type='button' 
                    onClick={()=> {
                       closeModal();
                       navigate('/');
                    }}
                    className='btn-blue'
                    style={{ marginTop: '15px' }}>Close</button>
            </div>
            );
        }
        // fail
        else {
            openModal(<div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h2>Failed to save Cocktail</h2>
                <button type='button' onClick={closeModal}
                    className='btn-blue'
                    style={{ marginTop: '15px' }}>Close</button>
            </div>
            );
        }
    }

    return (
        <div className={styles.pageContainer}>
            <h1>Add a New Cocktail</h1>
            <NewCocktailForm onSubmit={handleOnSubmit} />
        </div>
    );
};

export default NewCocktailPage;