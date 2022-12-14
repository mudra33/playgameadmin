import * as React from 'react';
import PropTypes from 'prop-types';
import { FocusZone } from '@fluentui/react';
import { List as BaseList } from '@fluentui/react';
import { getTheme, mergeStyleSets } from '@fluentui/react';

const theme = getTheme();
const { palette, fonts } = theme;
const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 250;
const classNames = mergeStyleSets({
    listGridExample: {
        overflow: 'hidden',
        fontSize: 0,
        position: 'relative',
    },
    listGridExampleTile: {
        textAlign: 'center',
        outline: 'none',
        position: 'relative',
        float: 'left',
        background: palette.neutralLighter,
        selectors: {
            'focus:after': {
                content: '',
                position: 'absolute',
                left: 2,
                right: 2,
                top: 2,
                bottom: 2,
                boxSizing: 'border-box',
                border: `1px solid ${palette.white}`,
            },
        },
    },
    listGridExampleSizer: {
        paddingBottom: '100%',
    },
    listGridExamplePadder: {
        position: 'absolute',
        left: 2,
        top: 2,
        right: 2,
        bottom: 2,
    },
    listGridExampleLabel: {
        background: 'rgba(0, 0, 0, 0.3)',
        color: '#FFFFFF',
        position: 'absolute',
        padding: 10,
        bottom: 0,
        left: 0,
        width: '100%',
        fontSize: fonts.small.fontSize,
        boxSizing: 'border-box',
    },
    listGridExampleImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
    },
});

export const List = (props) => {
    const columnCount = React.useRef(0);
    const rowHeight = React.useRef(0);

    const getItemCountForPage = React.useCallback((itemIndex, surfaceRect) => {
        if (itemIndex === 0) {
            columnCount.current = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
            rowHeight.current = Math.floor(surfaceRect.width / columnCount.current);
        }
        return columnCount.current * ROWS_PER_PAGE;
    }, []);

    const onRenderCell = React.useCallback((item, index) => {
        return (
            <div
                className={classNames.listGridExampleTile}
                data-is-focusable
                style={{
                    width: 100 / columnCount.current + '%',
                }}>
                <div className={classNames.listGridExampleSizer}>
                    <div className={classNames.listGridExamplePadder}>
                        {/* <img src={item.thumbnail} className={classNames.listGridExampleImage} /> */}
                        <span className={classNames.listGridExampleLabel}>{`item ${index}`}</span>
                    </div>
                </div>
            </div>
        );
    }, []);

    const getPageHeight = React.useCallback(() => {
        return rowHeight.current * ROWS_PER_PAGE;
    }, []);

    // const items = useConst(() => createListItems(5000));

    return (
        <FocusZone>
            <BaseList
                items={props.data}
                renderedWindowsAhead={4}
                onRenderCell={onRenderCell}
                getPageHeight={getPageHeight}
                className={classNames.listGridExample}
                getItemCountForPage={getItemCountForPage}
            />
        </FocusZone>
    );
};

List.propTypes = {
    data: PropTypes.any,
};

export default List;
