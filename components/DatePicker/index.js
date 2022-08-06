import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker as BaseDatePicker } from '@fluentui/react';

const DatePicker = (props) => {
    return (
        <BaseDatePicker
            {...props}
            label={props.label}
            styles={getDateStyles}
            placeholder={props.placeholder || 'text'}
        />
    );
};

function getDateStyles(props) {
    const { required } = props;
    return {
        root: {
            paddingBottom: '15px',
        },
        icon: {
            paddingTop: '13px',
        },

        field: {
            letterSpacing: 0,
            color: '#999999',
            fontSize: '20px',
            fontWeight: 500,
            lineHeight: '18px',
            paddingLeft: '16px',
            fontFamily: "'Montserrat', sans-serif",
        },
        wrapper: {
            '.ms-Label': {
                letterSpacing: 0,
                color: '#000000',
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: '18px',
                fontFamily: "'Montserrat', sans-serif",
            },
            '.ms-TextField-fieldGroup': [
                {
                    height: '48px',
                    border: '1px solid #C4C4C4',
                    borderRadius: '8px',
                    '.ms-TextField-field': {
                        letterSpacing: 0,
                        color: '#999999',
                        fontSize: '20px',
                        fontWeight: 500,
                        lineHeight: '18px',
                        paddingLeft: '16px',
                        fontFamily: "'Montserrat', sans-serif",
                    },
                },
                required && {
                    borderTopColor: props.theme.semanticColors.errorText,
                },
            ],
        },
    };
}

DatePicker.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
};

export default DatePicker;
