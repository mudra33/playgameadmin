import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb as BaseBreadcrumb } from '@fluentui/react';

const Breadcrumb = (props) => {
    return (
        <BaseBreadcrumb
            {...props}
            items={props.items}
            maxDisplayedItems={3}
            overflowAriaLabel="More links"
            ariaLabel="Breadcrumb with items rendered as buttons"
        />
    );
};

Breadcrumb.propTypes = {
    items: PropTypes.any,
};

export default Breadcrumb;
