import React from 'react';
import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';
import { DetailsList } from '@fluentui/react';
import DocumentCard from '../../components/DocumentCard';
import Layout from '../../components/Layout/Post';

const container = {
    display: 'flex',
    justifyContent: 'center',
    margin: '10vh 0',
};

const cards = [
    {
        key: 'key1',
        title: 'Current Balance',
        amount: '$21 837',
        icon: 'Money',
        percentage: '2.3',
    },
    {
        kary: 'key2',
        title: 'Current Expanses',
        amount: '$10 927',
        icon: 'PaymentCard',
        percentage: '0.3',
    },
    {
        key: 'key3',
        title: 'Current Income',
        amount: '$15 093',
        icon: 'Savings',
        percentage: '1.3',
    },
];

const operations = [
    {
        from: '0000 0284 7529 4751 8475',
        to: '0980 9808 8200 7680',
        amount: '$1 510',
        date: '20-05-2020',
    },
    {
        from: '0000 0284 7529 4751 8475',
        to: '0980 9808 8200 7680',
        amount: '$1 010',
        date: '19-05-2020',
    },
    {
        from: '0000 0284 7529 4751 8475',
        to: '0980 9808 8200 7680',
        amount: '$1 350',
        date: '18-05-2020',
    },
    {
        from: '0000 0284 7529 4751 8475',
        to: '0980 9808 8200 7680',
        amount: '$1 900',
        date: '18-05-2020',
    },
    {
        from: '0000 0284 7529 4751 8475',
        to: '0980 9808 8200 7680',
        amount: '$6 350',
        date: '17-05-2020',
    },
];

const columns = [
    {
        key: 'column1',
        name: 'From',
        fieldName: 'from',
        minWidth: 100,
        maxWidth: 300,
        isResizable: true,
    },
    {
        key: 'column2',
        name: 'To',
        fieldName: 'to',
        minWidth: 100,
        maxWidth: 300,
        isResizable: true,
    },
    {
        key: 'column3',
        name: 'Amount',
        fieldName: 'amount',
        minWidth: 100,
        maxWidth: 300,
        isResizable: true,
    },
    {
        key: 'column4',
        name: 'Date',
        fieldName: 'date',
        minWidth: 100,
        maxWidth: 300,
        isResizable: true,
    },
];

const Owner = () => {
    return (
        <Layout title="Owners">
            <div className="ms-Grid-row">
                <div style={container}>
                    {cards.map((card) => (
                        <DocumentCard key={card.key} data={card} />
                    ))}
                </div>
            </div>
            <div className="ms-Grid-row">
                <div data-is-scrollable={true}>
                    {/* <div className={s-Grid-col ms-sm9 ms-xl9 ${classNames.table}}> */}
                    <DetailsList items={operations} columns={columns} selectionMode={0} />
                    {/* </div> */}
                </div>
            </div>
        </Layout>
    );
};

Owner.propTypes = {
    data: PropTypes.any,
    session: PropTypes.any,
};

export default Owner;
