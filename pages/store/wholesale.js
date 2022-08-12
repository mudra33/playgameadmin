import React from 'react';
import Layout from '../../components/Layout/Post';
import { DatePicker, PrimaryButton, Label, Text, DefaultButton } from '@fluentui/react';
const transactionReports = () => {
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

    const Datestyles = {
        root: {
            maxWidth: 300,
            selectors: { '> *': { marginBottom: 15 } },
            border: '1px solid #C4C4C4',
            background: '#F4F4F4',
            borderRadius: '6px',
        },
    };

    return (
        <Layout title="Store WholeSale International Long Distance Pre-Purchased Credit Reporting">
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
                Wholesale International Long Distance <br />
                Pre-Purchased Credit Reporting
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
                <div className="ms-Grid" dir="ltr" style={{ marginTop: '20px' }}>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                            <DatePicker styles={Datestyles} placeholder="From Date" borderless={true} />
                        </div>

                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                            <DatePicker styles={Datestyles} placeholder="To Date" borderless={true} />
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
                        <div className="ms-Grid-col ms-sm6">
                            <DefaultButton text="Exit" styles={exitButtonStyles} />
                        </div>

                        <div className="ms-Grid-col ms-sm6">
                            <PrimaryButton text="Create Report" styles={buttonStyles} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default transactionReports;
