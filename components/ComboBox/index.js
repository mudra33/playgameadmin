import React from 'react';
import PropTypes from 'prop-types';
import { ComboBox as BaseComboBox } from '@fluentui/react';

const ComboBox = (props) => {
    return (
        <BaseComboBox
            {...props}
            label={props.label}
            allowFreeform={true}
            autoComplete={'on'}
            {...props.multiSelect}
            options={props.options}
            onChange={props.onChange}
            selectedKey={props.selectedKeys}
        />
    );
};

ComboBox.propTypes = {
    placeholder: PropTypes.string,
    options: PropTypes.array,
    label: PropTypes.string,
    onChange: PropTypes.any,
    errorText: PropTypes.string,
    selectedKeys: PropTypes.selectedKeys,
    multiSelect: PropTypes.multiSelect,
};

export default ComboBox;
