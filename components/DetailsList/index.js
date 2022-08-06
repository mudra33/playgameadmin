import React from 'react';
import PropTypes from 'prop-types';
import {
    ScrollablePane,
    ScrollbarVisibility,
    MarqueeSelection,
    DetailsList as BaseDetailsList,
    DetailsListLayoutMode,
    ConstrainMode,
} from '@fluentui/react';

const DetailsList = (props) => {
    const items = props.items;
    const columns = props.columns;

    return items.length < 1 ? (
        <h2
            style={{
                color: '#000000',
                textAlign: 'center',
                font: 'normal normal 600 25px/36px Montserrat',
                letterSpacing: 0,
                opacity: 1,
            }}>
            No results found
        </h2>
    ) : (
        <ScrollablePane
            scrollbarVisibility={ScrollbarVisibility.auto}
            className={{
                height: '25vh',
                minHeight: '372px',
                borderRadius: '8px',
                position: 'relative',
                maxHeight: 'inherit',
                border: '2px solid #E5E5E5',
                background: '#FFFFFF 0% 0% no-repeat padding-box',
            }}>
            <MarqueeSelection>
                <BaseDetailsList
                    setKey="set"
                    selectionPreservedOnEmptyClick
                    constrainMode={ConstrainMode.unconstrained}
                    ariaLabelForSelectionColumn="Toggle selection"
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    items={items}
                    columns={columns}
                    ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                    // onRenderRow={(propsRow, defaultRender) => {
                    //     return (
                    //         <div className="red">
                    //             {defaultRender({
                    //                 ...propsRow,
                    //                 styles: {
                    //                     root: {
                    //                         background: propsRow.item.color,
                    //                         border: propsRow.item.border
                    //                     },
                    //                     label: {
                    //                         font: 'normal normal medium 13px/21px Montserrat'
                    //                     }
                    //                 }
                    //             })}
                    //         </div>
                    //     );
                    // }}
                />
            </MarqueeSelection>
        </ScrollablePane>
    );
};

DetailsList.propTypes = {
    items: PropTypes.array,
    columns: PropTypes.array,
};

export default DetailsList;
