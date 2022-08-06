import React from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton as BasePrimaryButton } from '@fluentui/react';

const PrimaryButton = (props) => {
    return <BasePrimaryButton {...props} styles={buttonStyles} />;
};
const buttonStyles = {
    root: {
        height: '45px',
        display: 'block',
        margin: '0 auto',
        borderRadius: '6px',
        padding: '0 55px 0 55px',
    },
};

PrimaryButton.propTypes = {
    formik: PropTypes.object,
    text: PropTypes.string,
};

export default PrimaryButton;
