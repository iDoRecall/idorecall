import React from 'react';
import './styles.scss';

const ActionButton: React.FC<{
    isDisabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    colorType?:
        | 'light'
        | 'green'
        | 'dark'
        | 'warning'
        | 'warning-light'
        | 'danger';
    size?: 'medium' | 'small' | 'extra-small';
    form?: 'round' | 'non-round';
    onClick?: any;
    children: React.ReactNode;
}> = ({
    isDisabled = false,
    type = 'button',
    onClick,
    size = 'medium',
    colorType = 'light',
    form = 'round',
    children,
}) => {
    return (
        <button
            className={`idr-ext-button idr-ext-button--${colorType} idr-ext-button--${size} idr-ext-button--${form}`}
            type={type}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ActionButton;
