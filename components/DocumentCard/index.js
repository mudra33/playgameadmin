import React from 'react';
import PropTypes from 'prop-types';
import {
    DocumentCard as BaseDocumentCard,
    DocumentCardLogo,
    DocumentCardTitle,
} from '@fluentui/react';

const styles = {
    cardStyles: {
        root: {
            padding: 20,
            width: '90%',
            margin: 'auto',
            maxWidth: '90%',
            background: 'white',
            borderTop: '5px solid #0078d4',
        },
    },
    icon: {
        root: {
            width: 'auto',
            padding: 0,
            display: 'inline-block',
        },
    },
    header: {
        root: {
            fontSize: 20,
            fontWeight: 'bold',
            display: 'inline-block',
        },
    },
    amount: {
        root: {
            fontSize: 20,
            height: 'auto',
            fontWeight: 'bold',
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
    percentage: {
        root: {
            // padding: 0,
            fontSize: 16,
            height: 'auto',
            color: '#0078d4',
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,
            fontWeight: 'bold',
        },
    },
};

const DocumentCard = (props) => {
    return (
        <div className="s-Grid-col ms-sm3 ms-xl3">
            <BaseDocumentCard
                aria-label={
                    'Document Card with logo, text preview, and status. Conversation about annual report. ' +
                    'Content preview. 3 attachments. Sent by Annie Lindqvist and 2 others in March 13, 2018.'
                }
                onClickHref="http://bing.com"
                styles={styles.cardStyles}>
                <DocumentCardLogo logoIcon={props.data.icon} styles={styles.icon} />
                <DocumentCardTitle shouldTruncate title={props.data.title} styles={styles.header} />
                <DocumentCardTitle
                    shouldTruncate
                    title={`${props.data.amount}`}
                    styles={styles.amount}
                />
                <DocumentCardTitle
                    shouldTruncate
                    showAsSecondaryTitle
                    title={`${props.data.percentage} %`}
                    styles={styles.percentage}
                />
            </BaseDocumentCard>
        </div>
    );
};

DocumentCard.propTypes = {
    data: PropTypes.any,
};

export default DocumentCard;
