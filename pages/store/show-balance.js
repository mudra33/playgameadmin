import React from 'react';
import Layout from '../../components/Layout/Post';
import { Dropdown, Label, Text, DefaultButton, PrimaryButton } from '@fluentui/react';
const showBalance = () => {
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

    const buttonStyles = {
        root: {
            height: '48px',
            borderRadius: '8px',
            width: '245px',
            background: '#E5E5E5 0% 0% no-repeat padding-box',
            opacity: 1,
        },
        label: {
            textAlign: 'center',
            font: 'normal normal 700 20px/15px Montserrat',
            letterSpacing: '0.2px',
        },
    };
    const exitButtonStyles = {
        root: {
            width: '100%',
            height: '48px',
            marginRight: '10px',
            borderRadius: '8px',
            border: '1px solid #E5E5E5',
            background: '#E5E5E5 0% 0% no-repeat padding-box',
        },
        label: {
            color: '#999999',
            textAlign: 'center',
            letterSpacing: '0.2px',
            font: 'normal normal bold 20px/18px Montserrat',
        },
    };

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

    const labelFieldStyles = {
        root: {
            color: '#000000',
            letterSpacing: 0,
            textAlign: 'left',
            fontSize: '18px',
            lineHeight: '24px',
            font: 'normal normal medium',
            fontFamily: "'Montserrat'",
            opacity: 1,
        },
    };

    const dropdownStyles = {
        title: {
            height: '48px',
            fontWeight: 600,
            color: '#999999',
            display: 'flex',
            letterSpacing: 0,
            fontSize: '16px',
            textAlign: 'left',
            lineHeight: '18px',
            borderRadius: '8px',
            alignItems: 'center',
            font: 'normal normal',
            border: '1px solid #C4C4C4',
            fontFamily: "'Montserrat', sans-serif",
            background: '#F4F4F4 0% 0% no-repeat padding-box',
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
        <Layout title="Store Show Balance">
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
                SHOW BALANCE/BONUS
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
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Label styles={labelStyles}>Store Name:&nbsp;</Label>
                            <Text styles={textStyles}> Xxxxxxxx</Text>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Label styles={labelStyles}>Store Id:&nbsp;</Label>
                            <Text styles={textStyles}>XXX</Text>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
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
                        <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg8">
                            <Label styles={labelFieldStyles}>Show Credit Balance on Cashier Screen?</Label>
                        </div>

                        <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
                            <Dropdown
                                label=""
                                styles={dropdownStyles}
                                options={[
                                    { key: 'Yes', text: 'Yes' },
                                    { key: 'No', text: 'No' },
                                ]}
                                onChange={onDropdownChange}
                            />
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
                        <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg8">
                            <Label styles={labelFieldStyles}>Show dollar amount or OK/LOW?</Label>
                        </div>

                        <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
                            <Dropdown
                                placeholder="Dollar Amount"
                                label=""
                                styles={dropdownStyles}
                                options={[
                                    { key: '$20', text: '$20' },
                                    { key: '$30', text: '$30' },
                                ]}
                                onChange={onDropdownChange}
                            />
                        </div>
                    </div>
                </div>

                <div
                    className="ms-Grid"
                    dir="ltr"
                    style={{
                        padding: '30px 0 0 0',
                    }}>
                    <div className="ms-Grid-row" style={{ paddingBottom: '20px' }}>
                        <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg8">
                            <Label styles={labelFieldStyles}>Set Low Balance threshold to</Label>
                        </div>

                        <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
                            <Dropdown
                                placeholder="$500"
                                label=""
                                styles={dropdownStyles}
                                options={[
                                    { key: '$500', text: '$500' },
                                    { key: '$550', text: '$550' },
                                ]}
                                onChange={onDropdownChange}
                            />
                        </div>
                    </div>
                    <div className="ms-Grid-row" style={{ paddingBottom: '20px' }}>
                        <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg8">
                            <Label styles={labelFieldStyles}>
                                Show/Allow Bonus Entries? (This Will Reduce Your Net Profit)
                            </Label>
                        </div>

                        <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
                            <Dropdown
                                label=""
                                styles={dropdownStyles}
                                options={[
                                    { key: 'yes', text: 'yes' },
                                    { key: 'no', text: 'no' },
                                ]}
                                onChange={onDropdownChange}
                            />
                        </div>
                    </div>
                    <div style={{ paddingBottom: '25px' }}>
                        <Text styles={labelStyles}>
                            You will receive a refill reminder when your account falls to threshold
                        </Text>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <DefaultButton text="Exit" styles={exitButtonStyles} />
                        </div>

                        <div className="ms-Grid-col ms-sm6">
                            <PrimaryButton text="Continue" styles={buttonStyles} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default showBalance;
