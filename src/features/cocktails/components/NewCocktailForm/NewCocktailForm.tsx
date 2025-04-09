import React, { useCallback, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import styles from './NewCocktailForm.module.css';
import TextInput from '@/components/Inputs/TextInput/TextInput';
import { Cocktail } from '../../../cocktails/types';
import { validateAndReadImage } from '@/utils/imageUtils';

interface Props {
    onSubmit: (data: Cocktail) => void;
}

const NewCocktailForm: React.FC<Props> = ({ onSubmit }) => {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<Cocktail>({
        defaultValues: {
            id: '',
            name: '',
            instructions: '',
            image: '',
            ingredients: [{ ingredient: '', measure: '' }],
        },
    });

    const [imageError, setImageError] = useState<string>();

    // for the ingredients array
    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control,
        name: 'ingredients',
    });

    // watching changes for realtime actions
    const name = watch('name');
    const instructions = watch('instructions');
    const ingredients = watch('ingredients');
    const image = watch('image');

    // handle image file upload as base64
    const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        validateAndReadImage(file, {
            onSuccess: (base64) => setValue('image', base64, { shouldValidate: true }),
            onError: (msg) => setImageError(msg),
        });
    }, [setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <TextInput
                label="Name"
                placeholder="Cocktail Name"
                register={register('name', { required: 'Name is required' })}
                error={errors.name}
                value={name}
            />

            <TextInput
                label="Instructions"
                placeholder="Instructions"
                register={register('instructions', { required: 'Instructions are required' })}
                error={errors.instructions}
                value={instructions}
            />

            <div>
                <label>Upload Image</label>
                <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} />
                {imageError && <p className={styles.inputErrorText}>{imageError}</p>}
                {image && <img width='200px' src={image} alt="Preview" className={styles['image-preview']} />}
            </div>

            <fieldset style={{ padding: '15px' }}>
                <legend style={{ padding: '0 5px 0 5px' }}>Ingredients</legend>
                {fields.map((field, index) => (
                    <div key={field.id} className={styles.ingredientRow}>
                        <TextInput
                            label="Ingredient"
                            placeholder="Ingredient"
                            register={register(`ingredients.${index}.ingredient`, { required: 'Required' })}
                            error={errors.ingredients?.[index]?.ingredient}
                            value={ingredients?.[index]?.ingredient}
                        />

                        <TextInput
                            label="Measure"
                            placeholder="Measure"
                            register={register(`ingredients.${index}.measure`, { required: 'Required' })}
                            error={errors.ingredients?.[index]?.measure}
                            value={ingredients?.[index]?.measure}
                        />

                        <button style={{ marginTop: '25px' }} type="button" onClick={() => remove(index)}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => append({ ingredient: '', measure: '' })}>
                    Add Ingredient
                </button>
            </fieldset>

            <button type="submit">Save Cocktail</button>
        </form>
    );
};

export default NewCocktailForm;