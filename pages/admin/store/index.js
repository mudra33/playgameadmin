import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { CommandBar } from '@fluentui/react';
import Layout from '../../../components/Layout/Post';
import PageHeader from '../../../components/PageHeader';
import DetailsList from '../../../components/DetailsList';

const StoreListing = (props) => {
    const router = useRouter();
    const [storeData, setStoreData] = React.useState(props.data);

    const columns = [
        {
            key: 'column1',
            name: 'Action',
            fieldName: 'action',
            minWidth: 70,
            maxWidth: 100,
            isResizable: true,
            onRender: (item) => {
                return (
                    <>
                        <CommandBar
                            styles={{
                                root: {
                                    height: 'auto',
                                    background: 'transparent',
                                    border: 'none',
                                },
                                subComponentStyles: {
                                    menuItem: {
                                        label: { fontSize: 18, color: 'red' },
                                        icon: { color: 'red' },
                                        iconHovered: { color: 'red' },
                                    },
                                    callout: {},
                                },
                            }}
                            items={[
                                {
                                    key: 'edit',
                                    iconProps: { iconName: 'Edit' },
                                    onClick: () =>
                                        router.push(
                                            `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/store/${item.StoreKey}`
                                        ),
                                },
                                {
                                    key: 'delete',
                                    iconProps: { iconName: 'Delete' },
                                    onClick: async () => {
                                        await fetch(
                                            `/api/store/${item.StoreKey}`,
                                            {
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                method: 'DELETE',
                                            }
                                        );

                                        let store = await fetchData();
                                        setStoreData(store.data);
                                    },
                                },
                            ]}
                            overflowButtonProps={{ ariaLabel: 'More commands' }}
                            ariaLabel="Use left and right arrow keys to navigate between commands"
                        />
                    </>
                );
            },
        },
        {
            key: 'column2',
            name: ' Name',
            fieldName: 'StoreName',
            minWidth: 90,
            maxWidth: 180,
            isResizable: true,
        },
        {
            key: 'column3',
            name: ' Phone',
            fieldName: 'StorePhone',
            minWidth: 90,
            maxWidth: 120,
            isResizable: true,
        },
        {
            key: 'column6',
            name: 'Store City',
            fieldName: 'StoreCity',
            minWidth: 90,
            maxWidth: 120,
            isResizable: true,
        },
        {
            key: 'column8',
            name: ' Zip',
            fieldName: 'StoreZip',
            minWidth: 90,
            maxWidth: 120,
            isResizable: true,
        },
        {
            key: 'column14',
            name: 'Salesperson',
            fieldName: 'Salesperson',
            minWidth: 90,
            maxWidth: 180,
            isResizable: true,
        },
        {
            key: 'column15',
            name: 'Salesperson Percentage',
            fieldName: 'SalespersonPercentage',
            minWidth: 90,
            maxWidth: 180,
            isResizable: true,
        },
        {
            key: 'column16',
            name: 'Comments',
            fieldName: 'Comments',
            minWidth: 90,
            maxWidth: 180,
            isResizable: true,
        },
    ];

    async function fetchData() {
        let store = await fetch(`/api/store`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });

        store = await store.json();

        return store;
    }

    return (
        <Layout title="List All Stores">
            <PageHeader
                title="Stores"
                button={{ text: 'Add new Store', link: '/admin/store/add' }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Store', key: 'store', isCurrentItem: true },
                ]}
            />

            <div data-is-scrollable={true}>
                <DetailsList items={storeData} columns={columns} />
            </div>
        </Layout>
    );
};

export async function getServerSideProps() {
    let store = await fetch(`/api/store`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    store = await store.json();

    return {
        props: {
            data: store.data,
        },
    };
}

StoreListing.propTypes = {
    data: PropTypes.any,
};

export default StoreListing;
