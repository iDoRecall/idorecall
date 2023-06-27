import * as React from 'react';
import './styles.scss';
import { Spinner } from '../../atoms/Spinner';

export const Loading = () => {
    return (
        <div className='spinner-wrapper'>
            <Spinner width={50} height={50} />
        </div>
    );
};
