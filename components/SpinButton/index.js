import React from 'react';
import PropTypes from 'prop-types';
import { SpinButton as BaseSpinButton } from '@fluentui/react';

const SpinButton = (props) => {
    return <BaseSpinButton {...props} min={props.min} step={props.step} value={props.value} styles={spinStyles} />;
};

const spinStyles = {
    root: {
        paddingBottom: '15px',
    },
};

SpinButton.propTypes = {
    min: PropTypes.any,
    step: PropTypes.any,
    value: PropTypes.any,
};

export default SpinButton;
