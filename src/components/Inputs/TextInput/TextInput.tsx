import React, { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './TextInput.module.css';

interface InputProps {
    label: string;
    placeholder?: string;
    error?: FieldError;
    hidePlaceHolder?: boolean;
    showShrinkLabel?: boolean;
    type?: string;
    register: UseFormRegisterReturn;
    value?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    placeholder,
    error,
    hidePlaceHolder = false,
    showShrinkLabel = true,
    type = 'text',
    register,
    value = ''
}) => {
    const [isFocused, setIsFocused] = useState(false);

    // TODO: put it in shard utils
    const hasValue = value !== undefined && value !== '';

    return (
        <div style={{ position: 'relative' }}>
            {!hidePlaceHolder && showShrinkLabel && (
                <span className={hasValue || isFocused ? styles.shrinkPlaceholder : styles.customPlaceholder}>
                    {placeholder || label}
                </span>
            )}

            {!hidePlaceHolder && !showShrinkLabel && !hasValue && (
                <span className={styles.customPlaceholder}>{placeholder || label}</span>
            )}

            <input
                {...register}
                type={type}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={value}
            />

            {error && <p className={styles.inputErrorText}>{error.message}</p>}
        </div>
    );
};

export default React.memo(Input);