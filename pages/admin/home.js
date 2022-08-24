import React from 'react';
import Layout from '../../components/Layout/Pre';
import { useRouter } from 'next/router';
import Dropdown from '../../components/Dropdown';

const Home = () => {
    const router = useRouter();
    return (
        <Layout title="Admin Home Screen">
            <h1
                style={{
                    color: '#FFFFFF',
                    textAlign: 'center',
                    font: 'normal normal 700 34px/50px Montserrat',
                    letterSpacing: 0,
                    textTransform: 'uppercase',
                    opacity: 1,
                    paddingBottom: '17px',
                }}>
                Admin HOME SCREEN
            </h1>

            <div
                style={{
                    background: '#FFFFFF 0% 0% no-repeat padding-box',
                    opacity: 1,
                    padding: '50px',
                    width: '600px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <div
                    className="ms-Grid"
                    dir="ltr"
                    style={{
                        padding: '30px 0 0 0',
                    }}>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                            <Dropdown
                                placeholder="Add:"
                                label=""
                                options={[
                                    { key: '/admin/store/add', text: 'Add Store' },
                                    { key: '/admin/owner/add', text: 'Add Store Owner' },
                                    { key: '/admin/add', text: 'Add Admin' },
                                    { key: '/admin/fulfilment/add', text: 'Add Fulfilment' },
                                    { key: '/admin/sweepstakes/add', text: 'Add Sweepstakes' },
                                    {
                                        key: '/admin/percentage-plan/add',
                                        text: 'Add Percentage Plan',
                                    },
                                    // { key: '/admin/bonus-plan/add', text: 'Add Bonus Plan' },
                                ]}
                                onChange={(event, item) => {
                                    router.push(item.key);
                                }}
                            />
                        </div>

                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                            <Dropdown
                                placeholder="View:"
                                autoComplete="on"
                                options={[
                                    { key: '/admin/store', text: 'View All Stores' },
                                    { key: '/admin/owner', text: 'View All Store Owner' },
                                    { key: '/admin', text: 'View All Admin' },
                                    { key: '/admin/fulfilment', text: 'View All Fulfilment' },
                                    { key: '/admin/sweepstakes', text: 'View All Sweepstakes' },
                                    {
                                        key: '/admin/percentage-plan',
                                        text: 'View All Percentage Plan',
                                    },
                                    // { key: '/admin/bonus-plan', text: 'View All Bonus Plan' },
                                ]}
                                onChange={(event, item) => {
                                    router.push(item.key);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
