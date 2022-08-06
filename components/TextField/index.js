import React from 'react';
import PropTypes from 'prop-types';
import { TextField as BaseTextField } from '@fluentui/react';

const TextField = (props) => {
    return (
        <BaseTextField
            {...props}
            label={props.label}
            styles={getInputStyles}
            type={props.type || 'text'}
            errorMessage={props.formik.touched && props.formik.errors ? props.formik.errors : null}
        />
    );
};

function getInputStyles(props) {
    const { required } = props;
    return {
        root: {
            paddingTop: '5px',
            paddingBottom: '5px',
        },
        field: {
            borderRadius: '6px',
            border: '1px solid #FFFFFF',
        },
        label: {},
        revealButton: {
            height: '43px',
            borderRadius: '0px 6px 6px 0px',
        },
        fieldGroup: [
            {
                // width: '380px',
                height: '45px',
                borderRadius: '6px',
                border: '1px solid #FFFFFF',
                background: '#FFFFFF 0% 0% no-repeat padding-box',
            },
            required && {
                borderTopColor: props.theme.semanticColors.errorText,
            },
        ],
        errorMessage: {},
        subComponentStyles: {
            label: getLabelStyles,
        },
    };
}

function getLabelStyles(props) {
    const { required } = props;
    return {
        root: [
            {
                font: 'normal normal 600 15px/20px',
                letterSpacing: '0.3px',
                color: '#999999',
                textTransform: 'uppercase',
            },
            required && {
                color: props.theme.palette.themePrimary,
            },
        ],
    };
}

TextField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    formik: PropTypes.object,
    condition: PropTypes.any,
};

export default TextField;
