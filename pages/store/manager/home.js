import React from 'react';
import Layout from '../../../components/Layout/Post';
import { Dropdown, Label, Text, SelectableOptionMenuItemType } from '@fluentui/react';

const Home = () => {
    const labelStyles = {
        root: {
            letterSpacing: 0,
            color: '#000000',
            textAlign: 'left',
            fontSize: '22px',
            fontWeight: 500,
            font: 'normal normal',
            fontFamily: "'Montserrat', sans-serif",
        },
    };

    const options = [
        { key: 'Header1', text: 'View Cashiers', itemType: SelectableOptionMenuItemType.Header },
        { key: 'A', text: 'Option A' },
        { key: 'B', text: 'Option B' },
        {
            key: 'Header2',
            text: 'View Manager',
            itemType: SelectableOptionMenuItemType.Header,
        },
        { key: 'C', text: 'Option C' },
        { key: 'D', text: 'Option D' },
        {
            key: 'Header3',
            text: "View 86'd Customers",
            itemType: SelectableOptionMenuItemType.Header,
        },
        { key: 'E', text: 'Option E' },
    ];

    const textStyles = {
        root: {
            color: '#000000',
            letterSpacing: 0,
            textAlign: 'left',
            fontSize: '22px',
            fontWeight: 600,
            lineHeight: '30px',
            font: 'normal normal',
            fontFamily: "'Montserrat', sans-serif",
        },
    };

    const dropdownStyles = {
        label: {
            color: '#000000',
            fontWeight: 600,
            fontSize: '18px',
            letterSpacing: 0,
            lineHeight: '18px',
            font: 'normal normal',
            fontFamily: "'Montserrat', sans-serif",
        },
        title: {
            height: '48px',
            display: 'flex',
            textAlign: 'left',
            borderRadius: '8px',
            alignItems: 'center',
            color: '#999999',
            fontWeight: 600,
            fontSize: '18px',
            letterSpacing: 0,
            lineHeight: '18px',
            font: 'normal normal',
            fontFamily: "'Montserrat', sans-serif",
            border: '1px solid #C4C4C4',
            background: '#F4F4F4 0% 0% no-repeat padding-box',
            marginBottom: '10px',
        },
        caretDown: {
            color: '#000000',
        },
        caretDownWrapper: {
            top: '20%',
        },
        dropdownItemSelected: {
            background: '#00B1FF 0% 0% no-repeat padding-box',
        },
    };
    const [setSelectedItem] = React.useState();

    const onDropdownChange = (event, item) => {
        setSelectedItem(item);
    };

    return (
        <Layout title="Store Home Screen">
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
                STORE OWNER HOME SCREEN
            </h1>

            <div
                style={{
                    background: '#FFFFFF 0% 0% no-repeat padding-box',
                    opacity: 1,
                    padding: '30px 50px 50px 50px',
                    width: '600px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Label styles={labelStyles}>Store Name:&nbsp;</Label>
                            <Text styles={textStyles}> Xxxxxxxx</Text>
                        </div>

                        <div
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Label styles={labelStyles}>Store Id:&nbsp;</Label>
                            <Text styles={textStyles}>XXX</Text>
                        </div>

                        <div
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Label styles={labelStyles}>Store Credit:&nbsp;</Label>
                            <Text styles={textStyles}>$xxxxxxx</Text>
                        </div>
                    </div>
                </div>

                <div
                    className="ms-Grid"
                    dir="ltr"
                    style={{
                        padding: '30px 0 0 0',
                    }}>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">
                            <Dropdown
                                placeholder="Settings:"
                                label=""
                                styles={dropdownStyles}
                                options={[
                                    { key: 'Change Password', text: 'Change Password' },
                                    { key: 'Show Balances', text: 'Show Balances' },
                                    { key: 'Bonuses', text: 'Bonuses' },
                                ]}
                                onChange={onDropdownChange}
                            />
                        </div>

                        <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">
                            <Dropdown
                                placeholder="Add:"
                                label=""
                                styles={dropdownStyles}
                                options={[
                                    { key: 'Add Cashier', text: 'Add Cashier' },
                                    { key: 'Add Manager', text: 'Add Manager' },
                                ]}
                                onChange={onDropdownChange}
                            />
                        </div>

                        <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">
                            <Dropdown
                                placeholder="View:"
                                autoComplete="on"
                                options={options}
                                styles={dropdownStyles}
                            />
                        </div>

                        <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">
                            <Dropdown
                                placeholder="Reports:"
                                label=""
                                border={false}
                                styles={dropdownStyles}
                                options={[
                                    { key: 'Transactions', text: 'Transactions' },
                                    { key: 'Customers', text: 'Customers' },
                                    { key: 'Sweepstakes', text: 'Sweepstakes' },
                                    { key: 'Credit Purchased', text: 'Credit Purchased' },
                                ]}
                                onChange={onDropdownChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
