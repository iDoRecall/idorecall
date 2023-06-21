import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Spinner: React.FC<{
    width: number;
    height: number;
}> = ({ width = 20, height = 20 }) => {
    return (
        <div className={`preloader-wrapper active`}>
            <div className='loader simple-circle' style={{ width, height }} />
        </div>
    );
};

Spinner.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

export default Spinner;
