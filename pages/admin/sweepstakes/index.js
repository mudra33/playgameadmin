import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../../components/Layout/Post';
import { useRouter } from 'next/router';
import { CommandBar } from '@fluentui/react';
import PageHeader from '../../../components/PageHeader';
import DetailsList from '../../../components/DetailsList';

const SweepstakesListing = (props) => {
    const router = useRouter();
    const [sweepstakesData, setSweepstakesData] = React.useState(props.data);

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
                                            `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/sweepstakes/${item.CompanySweepstakesKey}`
                                        ),
                                },
                                {
                                    key: 'delete',
                                    iconProps: { iconName: 'Delete' },
                                    onClick: async () => {
                                        await fetch(
                                            `/api/company-sweepstakes/${item.CompanySweepstakesKey}`,
                                            {
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                method: 'DELETE',
                                            }
                                        );
                                        let sweepstakes = await fetchData();
                                        setSweepstakesData(sweepstakes.data);
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
            fieldName: 'SweepstakesName',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
        },
        {
            key: 'column3',
            name: 'Company Name',
            fieldName: 'CompanyName',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
        },
        {
            key: 'column4',
            name: 'Comments',
            fieldName: 'Comments',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
        },
    ];

    return (
        <Layout title="List All Sweepstakes">
            <PageHeader
                title="Sweepstakes"
                button={{
                    text: 'Add New Sweepstakes',
                    link: '/admin/sweepstakes/add',
                }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Sweepstakes', key: 'Sweepstakes', isCurrentItem: true },
                ]}
            />

            <div data-is-scrollable={true}>
                <DetailsList items={sweepstakesData} columns={columns} />
            </div>
        </Layout>
    );
};

async function fetchData() {
    let sweepstakes = await fetch(
        `/api/company-sweepstakes`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        }
    );

    sweepstakes = await sweepstakes.json();

    return sweepstakes;
}

export async function getServerSideProps() {
    let sweepstakes = await fetch(
        `/api/company-sweepstakes`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        }
    );

    sweepstakes = await sweepstakes.json();

    return {
        props: {
            data: sweepstakes.data,
        },
    };
}

SweepstakesListing.propTypes = {
    data: PropTypes.any,
};

export default SweepstakesListing;
