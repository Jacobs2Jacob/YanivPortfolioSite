import React from 'react';
import styles from './ShrinkLabel.module.css';

interface ShrinkLabelProps {
    label: string;
    inputHasValue: boolean;
    inputIsFocused: boolean;
}

const ShrinkLabel: React.FC<ShrinkLabelProps> = ({
    label,
    inputHasValue,
    inputIsFocused,
}) => {
     
    const shouldShrink = (inputHasValue || inputIsFocused);
    const shouldShowStatic = !inputHasValue;

    if (!shouldShrink && !shouldShowStatic) {
        return null
    };

    return (
        <span
            className={shouldShrink ? styles.shrinkPlaceholder : styles.customPlaceholder}>
            {label}
        </span>
    );
};

export default ShrinkLabel;