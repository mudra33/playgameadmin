import React from 'react';
import PropTypes from 'prop-types';
import { Label as BaseLabel } from '@fluentui/react';

const Label = (props) => {
    return <BaseLabel {...props} label={props.label} styles={getLabelStyles} />;
};

function getLabelStyles() {
    return {
        root: [
            {
                letterSpacing: 0,
                color: '#000000',
                textAlign: 'left',
                fontSize: '20px',
                fontWeight: 500,
                font: 'normal normal',
                fontFamily: "'Montserrat', sans-serif",
            },
        ],
    };
}

Label.propTypes = {
    label: PropTypes.string,
};

export default Label;
