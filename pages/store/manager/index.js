import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { CommandBar } from '@fluentui/react';
import Layout from '../../../components/Layout/Post';
import PageHeader from '../../../components/PageHeader';
import DetailsList from '../../../components/DetailsList';

const ManagerListing = (props) => {
    const router = useRouter();
    const [managerData, setManagerData] = React.useState(props.data);

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
                                            `${process.env.NEXT_PUBLIC_API_BASE_URL}/store/manager/${item.UserKey}`
                                        ),
                                },
                                {
                                    key: 'delete',
                                    iconProps: { iconName: 'Delete' },
                                    onClick: async () => {
                                        await fetch(
                                            `/api/users/userKey/${item.UserKey}`,
                                            {
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                method: 'DELETE',
                                            }
                                        );
                                        let manager = fetchData();
                                        setManagerData(manager.data);
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
            name: 'First Name',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
            fieldName: 'UserFirstName',
        },
        {
            key: 'column3',
            name: 'Last Name',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
            fieldName: 'UserLastName',
        },
        {
            key: 'column4',
            name: 'Phone',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
            fieldName: 'UserPhone',
        },
        {
            key: 'column5',
            name: 'Email',
            minWidth: 100,
            maxWidth: 300,
            isResizable: true,
            fieldName: 'UserEmail',
        },
    ];

    return (
        <Layout title="Managers">
            <PageHeader
                title="Managers"
                button={{ text: 'Add New Manager', link: '/store/manager/add' }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Manager', key: 'manager', isCurrentItem: true },
                ]}
            />

            <div data-is-scrollable={true}>
                <DetailsList items={managerData} columns={columns} />
            </div>
        </Layout>
    );
};

async function fetchData() {
    let manager = await fetch(
        `/api/users?UserRole=Manager`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        }
    );
    manager = await manager.json();

    return manager;
}

export async function getServerSideProps() {
    const manager = fetchData();

    return {
        props: {
            data: manager.data,
        },
    };
}

ManagerListing.propTypes = {
    data: PropTypes.any,
};

export default ManagerListing;
