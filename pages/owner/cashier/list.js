import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { CommandBar } from '@fluentui/react';
import { getSession } from 'next-auth/client';
import Layout from '../../../components/Layout/Post';
import PageHeader from '../../../components/PageHeader';
import DetailsList from '../../../components/DetailsList';

const CashierListing = (props) => {
    const router = useRouter();
    const [cashierData, setCashierData] = React.useState(props.data);
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
                                            `${process.env.NEXT_PUBLIC_API_BASE_URL}/owner/cashier/${item.UserKey}`
                                        ),
                                },
                                {
                                    key: 'delete',
                                    iconProps: { iconName: 'Delete' },
                                    onClick: async () => {
                                        await fetch(`/api/users/UserKey/${item.UserKey}`, {
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            method: 'DELETE',
                                        });

                                        if (props.session && props.session.user && props.session.user.StoreKey) {
                                            const cashier = await fetchData(props.session.user.StoreKey);
                                            setCashierData(cashier.data);
                                        }
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
            name: ' First Name',
            fieldName: 'UserFirstName',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
        },
        {
            key: 'column3',
            name: ' Last Name',
            fieldName: 'UserLastName',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
        },
        {
            key: 'column4',
            name: ' Phone',
            fieldName: 'UserPhone',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
        },

        {
            key: 'column5',
            name: ' Email',
            fieldName: 'UserEmail',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
        },
    ];

    return (
        <Layout title="List All Cashiers">
            <PageHeader
                title="Cashiers"
                button={{ text: 'Add Cashier', link: '/owner/cashier/add' }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/owner/home' },
                    { text: 'Cashier', key: 'cashier', isCurrentItem: true },
                ]}
            />

            <div data-is-scrollable={true}>
                <DetailsList items={cashierData} columns={columns} />
            </div>
        </Layout>
    );
};

async function fetchData(StoreKey) {
    let cashier = await fetch(`/api/users?UserRole=Cashier&StoreKey=${StoreKey}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });
    cashier = await cashier.json();

    return cashier;
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const cashier = await fetchData(session.user.StoreKey);

    return {
        props: {
            data: cashier.data,
            session,
        },
    };
}

CashierListing.propTypes = {
    data: PropTypes.any,
    session: PropTypes.any,
};

export default CashierListing;
