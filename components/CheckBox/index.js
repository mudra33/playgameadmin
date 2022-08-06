import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox as BaseCheckbox } from '@fluentui/react';

const Checkbox = (props) => {
    return <BaseCheckbox {...props} key={props.key} name={props.name} label={props.label} />;
};

Checkbox.propTypes = {
    key: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
};

export default Checkbox;
