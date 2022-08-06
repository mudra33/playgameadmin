import React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton as BaseDefaultButton } from '@fluentui/react';

const DefaultButton = (props) => {
    return <BaseDefaultButton {...props} text={props.text} styles={buttonStyles} />;
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

DefaultButton.propTypes = {
    text: PropTypes.string,
};

export default DefaultButton;
