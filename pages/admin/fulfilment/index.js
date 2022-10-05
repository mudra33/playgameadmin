import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { CommandBar } from '@fluentui/react';
import Layout from '../../../components/Layout/Post';
import PageHeader from '../../../components/PageHeader';
import DetailsList from '../../../components/DetailsList';
const prodURL = process.env.NEXTAUTH_URL;

const FulfilmentListing = (props) => {
    const router = useRouter();
    const [fulfilmentData, setFulfilmentData] = React.useState(props.data);

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
                                    onClick: () => router.push(`/admin/fulfilment/${item.UserKey}`),
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
                                        let fulfilment = await fetchData(
                                            props.session &&
                                                props.session.user &&
                                                props.session.user.UserKey
                                                ? props.session.user.UserKey
                                                : '',
                                            ''
                                        );
                                        setFulfilmentData(fulfilment.data);
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
            fieldName: 'UserFirstName',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
        },
        {
            key: 'column3',
            name: 'Last Name',
            fieldName: 'UserLastName',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
        },
        {
            key: 'column4',
            name: 'Phone',
            fieldName: 'UserPhone',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
        },

        {
            key: 'column5',
            name: 'Email',
            fieldName: 'UserEmail',
            minWidth: 100,
            maxWidth: 300,
            isResizable: true,
        },
    ];

    return (
        <Layout title="Fulfilment Accounts">
            <PageHeader
                title="Fulfilment Accounts"
                button={{ text: 'Add New Fulfilment Account', link: '/admin/fulfilment/add' }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Fulfilment', key: 'fulfilment', isCurrentItem: true },
                ]}
            />

            <div data-is-scrollable={true}>
                <DetailsList items={fulfilmentData} columns={columns} />
            </div>
        </Layout>
    );
};

// async function fetchData(prodURL) {
//     let fulfilment = await fetch(prodURL + `/api/users?UserRole=Fulfilment`, {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         method: 'GET',
//     });
//     fulfilment = await fulfilment.json();

//     return fulfilment;
// }

async function fetchData(UserKey, prodURL) {
    let fulfilment = await fetch(prodURL + `/api/users?UserRole=Fulfilment&UserKey=${UserKey}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    fulfilment = await fulfilment.json();
    return fulfilment;
}

export async function getServerSideProps() {
    const fulfilment = await fetchData(prodURL);

    return {
        props: {
            data: fulfilment.data,
        },
    };
}

FulfilmentListing.propTypes = {
    data: PropTypes.any,
};

export default FulfilmentListing;
