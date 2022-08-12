import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { CommandBar } from '@fluentui/react';
import Layout from '../../../components/Layout/Post';
import PageHeader from '../../../components/PageHeader';
import DetailsList from '../../../components/DetailsList';

const PercentagePlanListing = (props) => {
    const router = useRouter();
    const [percentagePlanData, setPercentagePlanData] = React.useState(props.data);

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
                                            `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/percentage-plan/${item.PercentagePlanKey}`
                                        ),
                                },
                                {
                                    key: 'delete',
                                    iconProps: { iconName: 'Delete' },
                                    onClick: async () => {
                                        await fetch(
                                            `/api/percentage-plan/${item.PercentagePlanKey}`,
                                            {
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                method: 'DELETE',
                                            }
                                        );
                                        let percentagePlan = await fetchData();
                                        setPercentagePlanData(percentagePlan.data);
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
            fieldName: 'PercentagePlanName',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
        },
        {
            key: 'column3',
            name: 'Purchase Percentage',
            fieldName: 'PurchasePercentage',
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
        <Layout title="Percentage Plans">
            <PageHeader
                title="Percentage Plans"
                button={{
                    text: 'Add New Percentage Plan',
                    link: '/admin/percentage-plan/add',
                }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Percentage Plan', key: 'percentage-plan', isCurrentItem: true },
                ]}></PageHeader>

            <div data-is-scrollable={true}>
                <DetailsList items={percentagePlanData} columns={columns} />
            </div>
        </Layout>
    );
};

async function fetchData() {
    let percentagePlan = await fetch(
        `/api/percentage-plan`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        }
    );

    percentagePlan = await percentagePlan.json();
    return percentagePlan;
}

export async function getServerSideProps() {
    const percentagePlan = await fetchData();

    return {
        props: {
            data: percentagePlan.data,
        },
    };
}

PercentagePlanListing.propTypes = {
    data: PropTypes.any,
};

export default PercentagePlanListing;
