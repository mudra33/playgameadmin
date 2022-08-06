import React from 'react';
import { Text as BaseText } from '@fluentui/react';

const Text = (props) => {
    return <BaseText {...props} styles={getTextStyles} />;
};

function getTextStyles() {
    return {
        root: [
            {
                color: '#000000',
                letterSpacing: 0,
                textAlign: 'left',
                fontSize: '22px',
                fontWeight: 600,
                lineHeight: '30px',
                font: 'normal normal',
                fontFamily: "'Montserrat', sans-serif",
            },
        ],
    };
}

export default Text;
