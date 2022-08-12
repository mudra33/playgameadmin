import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { CommandBar } from '@fluentui/react';
import { getSession } from 'next-auth/client';
import Layout from '../../components/Layout/Post';
import PageHeader from '../../components/PageHeader';
import DetailsList from '../../components/DetailsList';

const AdminListing = (props) => {
    const router = useRouter();
    const [adminData, setAdminData] = React.useState(props.data);
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
                                            `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/${item.UserKey}`
                                        ),
                                },
                                {
                                    key: 'delete',
                                    iconProps: { iconName: 'Delete' },
                                    onClick: async () => {
                                        await fetch(
                                            `/api/users/UserKey/${item.UserKey}`,
                                            {
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                method: 'DELETE',
                                            }
                                        );
                                        let admin = await fetchData(
                                            props.session &&
                                                props.session.user &&
                                                props.session.user.UserKey
                                                ? props.session.user.UserKey
                                                : ''
                                        );
                                        setAdminData(admin.data);
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
        <Layout title="List All Admins">
            <PageHeader
                title="Owners"
                button={{ text: 'Add Admin', link: '/admin/add' }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Admin', key: 'admin', isCurrentItem: true },
                ]}
            />

            <div data-is-scrollable={true}>
                <DetailsList items={adminData} columns={columns} />
            </div>
        </Layout>
    );
};

async function fetchData(UserKey) {
    let admin = await fetch(
        `/api/users?UserRole=Admin&UserKey=${UserKey}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        }
    );

    admin = await admin.json();
    return admin;
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const UserKey = session && session.user && session.user.UserKey ? session.user.UserKey : '';

    const admin = await fetchData(UserKey);

    return {
        props: {
            data: admin.data,
            session,
        },
    };
}

AdminListing.propTypes = {
    data: PropTypes.any,
    session: PropTypes.any,
};

export default AdminListing;
