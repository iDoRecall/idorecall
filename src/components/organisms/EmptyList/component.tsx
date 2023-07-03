import * as React from 'react';
import './styles.scss';
import { EmptyListProps } from './EmptyListProps';

export const EmptyList: React.FC<EmptyListProps> = ({ title, text }) => {
    return (
        <div className='empty-list-wrapper'>
            <div className='empty-list-content'>
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </div>
    );
};
