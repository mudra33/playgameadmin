import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout/Post';
import { CommandBar, ChoiceGroup } from '@fluentui/react';
import PageHeader from '../../components/PageHeader';
import DetailsList from '../../components/DetailsList';

const Customers = (props) => {
    const [selectedUserBlocked, setSelectedUserBlocked] = React.useState(0);

    const UserBlockedoptions = [
        { key: 1, text: 'Yes' },
        { key: 0, text: 'No' },
    ];
    const [blockedUsersData, setBlockedUsersData] = React.useState(props.data);

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
                                    key: 'delete',
                                    iconProps: { iconName: 'Delete' },
                                    onClick: async () => {
                                        await fetch(`/api/users/userKey/${item.UserKey}`, {
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            method: 'DELETE',
                                        });
                                        let blockedUsersData = await fetchData();
                                        setBlockedUsersData(blockedUsersData.data);
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
        {
            key: 'column6',
            name: 'UserBlocked',
            fieldName: 'UserBlocked',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
            onRender: (item) => {
                return (
                    <>
                        <ChoiceGroup
                            options={UserBlockedoptions}
                            defaultSelectedKey={item.UserBlocked}
                            optionsContainIconOrImage={false}
                            onChange={async (event, eventItem) => {
                                setSelectedUserBlocked(eventItem.key);
                                await fetch(`/api/users/userKey/${item.UserKey}`, {
                                    body: JSON.stringify({
                                        UserBlocked: selectedUserBlocked,
                                        UserPassword: item.UserPassword,
                                    }),
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    method: 'PATCH',
                                });
                                let blockedUsersData = await fetchData();
                                setBlockedUsersData(blockedUsersData.data);
                            }}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <Layout title="List All 86'd Customers">
            <PageHeader
                title="86'd Customers"
                button={{ text: 'Add Customer', link: '/admin/add' }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Store', key: 'store', isCurrentItem: true },
                ]}
            />

            <div data-is-scrollable={true}>
                <DetailsList items={blockedUsersData} columns={columns} />
            </div>
        </Layout>
    );
};

async function fetchData() {
    let customer = await fetch(`/api/users?UserRole=Customer&UserKey=" "`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    customer = await customer.json();
    return customer;
}

export async function getServerSideProps() {
    const customer = await fetchData();

    return {
        props: {
            data: customer.data,
        },
    };
}

Customers.propTypes = {
    data: PropTypes.any,
};

export default Customers;
