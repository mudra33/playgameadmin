import React from 'react';
import PropTypes from 'prop-types';
import { MessageBar as BaseMessageBar } from '@fluentui/react';

const MessageBar = (props) => {
    return (
        <BaseMessageBar
            truncated={true}
            isMultiline={true}
            actions={props.actions}
            dismissButtonAriaLabel="Close"
            overflowButtonAriaLabel="See more"
            messageBarType={props.messageBarType}
            {...props}>
            {props.message}
        </BaseMessageBar>
    );
};

MessageBar.propTypes = {
    message: PropTypes.any,
    actions: PropTypes.bool,
    truncated: PropTypes.bool,
    isMultiline: PropTypes.bool,
    messageBarType: PropTypes.string,
};

export default MessageBar;
