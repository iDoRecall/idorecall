import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const FroalaPlaceholder: React.FC<{
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

FroalaPlaceholder.propTypes = {
    click: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};

export default FroalaPlaceholder;
