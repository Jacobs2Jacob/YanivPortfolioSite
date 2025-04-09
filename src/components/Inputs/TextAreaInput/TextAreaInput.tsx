import React, { useState } from 'react';
import baseStyles from '../InputBase.module.css';
import { InputBaseProps } from '../types';
import ShrinkLabel from '../ShrkinkLabel/ShrinkLabel';

interface TextAreaInputProps extends InputBaseProps {
    maxLength?: number;
}

const TextareaInput: React.FC<TextAreaInputProps> = ({
    label,
    placeholder,
    error,
    register,
    value = '',
    style,
    maxLength = 200
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== undefined && value !== '';

    return (
        <div style={{ position: 'relative' }}>

            <ShrinkLabel label={placeholder ? placeholder : label} inputHasValue={hasValue} inputIsFocused={isFocused} />

            <textarea
                {...register}
                maxLength={maxLength}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={value}
                style={style}
                className={baseStyles.textarea}
            />
            {error && <p className={baseStyles.inputErrorText}>{error.message}</p>}
        </div>
    );
};

export default React.memo(TextareaInput);