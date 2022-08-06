import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { Nav, initializeIcons } from '@fluentui/react';

const navigationStyles = {
    root: {
        height: '100vh',
        boxSizing: 'border-box',
        border: '1px solid #eee',
        overflowY: 'auto',
        paddingTop: '10vh',
    },
};

const links = {
    Admin: [
        {
            links: [
                {
                    name: 'Dashboard',
                    key: 'key1',
                    url: '/admin/home',
                    iconProps: {
                        iconName: 'News',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Admin',
                    key: 'key2',
                    url: '/admin/list',
                    iconProps: {
                        iconName: 'SwitcherStartEnd',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Owner',
                    key: 'key3',
                    url: '/admin/owner',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Fulfilment',
                    key: 'key4',
                    url: '/admin/fulfilment',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Percentage Plan',
                    key: 'key5',
                    url: '/admin/percentage-plan',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Bonus Plan',
                    key: 'key6',
                    url: '/admin/bonus-plan',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Sweepstakes',
                    key: 'key7',
                    url: '/admin/sweepstakes',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Store',
                    key: 'key8',
                    url: '/admin/store',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Store Credit',
                    key: 'key9',
                    url: '/admin/store/credit',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Reporting',
                    key: 'key10',
                    url: '/admin/reporting',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Change Password',
                    key: 'key11',
                    url: '/admin/change-password',
                    iconProps: {
                        iconName: 'PlayerSettings',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Settings',
                    key: 'key12',
                    url: '/',
                    iconProps: {
                        iconName: 'PlayerSettings',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
            ],
        },
    ],

    Owner: [
        {
            links: [
                {
                    name: 'Dashboard',
                    key: 'key1',
                    url: '/owner/home',
                    iconProps: {
                        iconName: 'News',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Cashier',
                    key: 'key2',
                    url: '/owner/cashier/list',
                    iconProps: {
                        iconName: 'SwitcherStartEnd',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Manager',
                    key: 'key3',
                    url: '/owner/manager',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Customers',
                    key: 'key4',
                    url: '/owner/customers',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Show Balance',
                    key: 'key5',
                    url: '/owner/balance',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },

                {
                    name: 'Reporting',
                    key: 'key6',
                    url: '/owner/reporting',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Settings',
                    key: 'key7',
                    url: '/owner/settings',
                    iconProps: {
                        iconName: 'PlayerSettings',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
            ],
        },
    ],
    Cashier: [
        {
            links: [
                {
                    name: 'Dashboard',
                    key: 'key1',
                    url: '/cashier/home',
                    iconProps: {
                        iconName: 'News',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Approval',
                    key: 'key2',
                    url: '/cashier/approval',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Approve Sale ',
                    key: 'key3',
                    url: '/cashier/approval/sale',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Prize Decline',
                    key: 'key4',
                    url: '/cashier/prize/decline',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Prize Request',
                    key: 'key5',
                    url: '/cashier/prize/request',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Prize Distribute',
                    key: 'key6',
                    url: '/cashier/prize/distribute',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Phone Time Only Sale',
                    key: 'key7',
                    url: '/cashier/sale/phone-time',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Customer Search',
                    key: 'key8',
                    url: '/cashier/customer',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Completed Orders',
                    key: 'key9',
                    url: '/cashier/orders',
                    iconProps: {
                        iconName: 'StackedLineChart',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Queue',
                    key: 'key10',
                    url: '/cashier/queue',
                    iconProps: {
                        iconName: 'PlayerSettings',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Investigate Transaction',
                    key: 'key11',
                    url: '/cashier/transaction',
                    iconProps: {
                        iconName: 'PlayerSettings',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
                {
                    name: 'Mid Shift Reporting',
                    key: 'key12',
                    url: '/cashier/reporting',
                    iconProps: {
                        iconName: 'PlayerSettings',
                        styles: {
                            root: {
                                fontSize: 20,
                                color: '#106ebe',
                            },
                        },
                    },
                },
            ],
        },
    ],
};

const Navigation = () => {
    const [session] = useSession();

    const router = useRouter();
    const [key, setKey] = useState('');

    const UserRole = session && session.user && session.user.RoleName ? session.user.RoleName : '';

    initializeIcons();
    return (
        <>
            <Nav
                groups={links[UserRole]}
                selectedKey={key || 'key1'}
                styles={navigationStyles}
                onLinkClick={(e, item) => {
                    e.preventDefault();
                    setKey(item.key);
                    router.push(item.url);
                }}
            />
        </>
    );
};

export default Navigation;
