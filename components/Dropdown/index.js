import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown as BaseDropdown } from '@fluentui/react';

const Dropdown = (props) => {
    return (
        <BaseDropdown
            {...props}
            label={props.label}
            options={props.options}
            styles={dropdownStyles}
            onChange={props.onChange}
            componentRef={DropdownRef}
            errorMessage={props.errorText}
            placeholder={props.placeholder}
            selectedKey={props.selectedKey}
            autocomplete={props.autocomplete}
        />
    );
};
const DropdownRef = null;

const dropdownStyles = {
    root: {
        paddingTop: '5px',
        paddingBottom: '5px',
    },
    label: {
        font: 'normal normal 600 15px/20px',
        letterSpacing: '0.3px',
        color: '#999999',
        textTransform: 'uppercase',
    },
    title: {
        height: '45px',
        lineHeight: '42px',
        borderRadius: '6px 6px 0 0',
        border: '1px solid #FFFFFF',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
    },
    caretDown: {},
    caretDownWrapper: {
        top: '7px',
    },
    dropdownItemSelected: {},
};

Dropdown.propTypes = {
    placeholder: PropTypes.string,
    autocomplete: PropTypes.any,
    options: PropTypes.array,
    label: PropTypes.string,
    onChange: PropTypes.any,
    errorText: PropTypes.string,
    selectedKey: PropTypes.any,
};

export default Dropdown;
