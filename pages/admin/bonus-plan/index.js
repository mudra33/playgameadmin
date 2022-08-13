import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { CommandBar } from '@fluentui/react';
import Layout from '../../../components/Layout/Post';
import PageHeader from '../../../components/PageHeader';
import DetailsList from '../../../components/DetailsList';

const BonusPlanListing = (props) => {
    const router = useRouter();
    const [bonusPlanData, setBonusPlanData] = React.useState(props.data);

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
                                            `/admin/bonus-plan/${item.BonusPlanKey}`
                                        ),
                                },
                                {
                                    key: 'delete',
                                    iconProps: { iconName: 'Delete' },
                                    onClick: async () => {
                                        await fetch(`/api/bonus-plan/${item.BonusPlanKey}`, {
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            method: 'DELETE',
                                        });
                                        let bonusPlan = await fetchData();
                                        setBonusPlanData(bonusPlan.data);
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
            name: 'Name',
            fieldName: 'BonusPlanName',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
        },
        {
            key: 'column3',
            name: 'Comments',
            fieldName: 'Comments',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
        },
    ];

    return (
        <Layout title="List All Bonus Plans">
            <PageHeader
                title="Owners"
                button={{ text: 'Add Bonus Plan', link: '/admin/bonus-plan/add' }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Bonus Plan', key: 'bonus-plan', isCurrentItem: true },
                ]}
            />

            <div data-is-scrollable={true}>
                <DetailsList items={bonusPlanData} columns={columns} />
            </div>
        </Layout>
    );
};

async function fetchData() {
    let bonusPlan = await fetch(`/api/bonus-plan`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });
    bonusPlan = await bonusPlan.json();

    return bonusPlan;
}

export async function getServerSideProps() {
    const bonusPlan = await fetchData();

    return {
        props: {
            data: bonusPlan.data,
        },
    };
}

BonusPlanListing.propTypes = {
    data: PropTypes.any,
};

export default BonusPlanListing;
