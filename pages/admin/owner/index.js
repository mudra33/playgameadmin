import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { CommandBar } from '@fluentui/react';
import Layout from '../../../components/Layout/Post';
import PageHeader from '../../../components/PageHeader';
import DetailsList from '../../../components/DetailsList';

const OwnerListing = (props) => {
    const router = useRouter();
    const [ownerData, setOwnerData] = React.useState(props.data);

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
                                            `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/owner/${item.UserKey}`
                                        ),
                                },
                                {
                                    key: 'delete',
                                    iconProps: { iconName: 'Delete' },
                                    onClick: async () => {
                                        await fetch(
                                            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/UserKey/${item.UserKey}`,
                                            {
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                method: 'DELETE',
                                            }
                                        );
                                        let owner = fetchData();
                                        setOwnerData(owner.data);
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
        <Layout title="Owners">
            <PageHeader
                title="Owners"
                button={{ text: 'Add New Owner', link: '/admin/owner/add' }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Owner', key: 'owner', isCurrentItem: true },
                ]}
            />

            <div data-is-scrollable={true}>
                <DetailsList items={ownerData} columns={columns} />
            </div>
        </Layout>
    );
};

async function fetchData() {
    let owner = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?UserRole=Owner`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });
    owner = await owner.json();

    return owner;
}

export async function getServerSideProps() {
    const owner = await fetchData();

    return {
        props: {
            data: owner.data,
        },
    };
}

OwnerListing.propTypes = {
    data: PropTypes.any,
};

export default OwnerListing;
