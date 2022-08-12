import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout/Post';
import { useSession } from 'next-auth/client';
import { ChoiceGroup } from '@fluentui/react';
import PageHeader from '../../components/PageHeader';
import DetailsList from '../../components/DetailsList';
import Text from '../../components/Text';
import Label from '../../components/Label';

const Customers = (props) => {
    const [selectedUserBlocked, setSelectedUserBlocked] = React.useState(0);

    const UserBlockedoptions = [
        { key: 1, text: 'Yes' },
        { key: 0, text: 'No' },
    ];
    const [blockedUsersData, setBlockedUsersData] = React.useState(props.data);
    const [session] = useSession();

    const columns = [
        {
            key: 'column1',
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
                                await fetch(
                                    `/api/users/UserKey/${item.UserKey}`,
                                    {
                                        body: JSON.stringify({
                                            UserBlocked: selectedUserBlocked,
                                        }),
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        method: 'PATCH',
                                    }
                                );
                                let blockedUsersData = await fetchData();
                                setBlockedUsersData(blockedUsersData.data);
                            }}
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
        <Layout title="List All 86'd Customers">
            <PageHeader
                title="86'd Customers"
                button={{ text: 'Add Customer', link: '/admin/add' }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Store', key: 'store', isCurrentItem: true },
                ]}
            />
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: '15px',
                        }}>
                        <Label>Store Name:&nbsp;</Label>
                        <Text>
                            {session && session.user && session.user.StoreName
                                ? session.user.StoreName
                                : 'No Store Name Found'}
                        </Text>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: '15px',
                        }}>
                        <Label>Store Id:&nbsp;</Label>
                        <Text>
                            {session && session.user && session.user.StoreKey
                                ? session.user.StoreKey
                                : 'No Store Key Found'}
                        </Text>
                    </div>
                </div>
            </div>
            <div data-is-scrollable={true}>
                <DetailsList items={blockedUsersData} columns={columns} />
            </div>
        </Layout>
    );
};

async function fetchData() {
    let customer = await fetch(
        `/api/users?UserRole=Customer`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        }
    );

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
