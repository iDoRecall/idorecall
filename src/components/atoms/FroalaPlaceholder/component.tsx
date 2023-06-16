import React from 'react';

import './styles.scss';

export const FroalaPlaceholder: React.FC<{
    click: (T: boolean) => void;
    text: string;
}> = ({ click, text }) => (
    <div className='froala-placeholder'>
        <p
            className='content'
            onClick={() => {
                click(true);
            }}
        >
            {text}
        </p>
        <div className='errors'>Required</div>
    </div>
);
