import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export interface InputBaseProps {
    label: string;
    placeholder?: string;
    error?: FieldError;
    register: UseFormRegisterReturn;
    value?: string;
    style?: React.CSSProperties;
}