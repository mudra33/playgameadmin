import React from 'react';
import Layout from '../../components/Layout/Post';
import {
    Dropdown,
    DatePicker,
    PrimaryButton,
    Label,
    Text,
    DefaultButton,
    Checkbox,
} from '@fluentui/react';
const sweepstakesReports = () => {
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
    const checkboxStyles = {
        root: {
            height: '78px',
            paddingTop: '15px',
            alignItems: 'center',
            justifyContent: 'center',
        },
        label: {
            textAlign: 'left',
            letterSpacing: 0,
            color: '#999999',
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '18px',
            paddingLeft: '16px',
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

    function getDateStyles(props) {
        const { required } = props;
        return {
            root: {
                paddingBottom: '15px',
            },
            icon: {
                paddingTop: '13px',
            },

            field: {
                letterSpacing: 0,
                color: '#999999',
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '18px',
                paddingLeft: '16px',
                fontFamily: "'Montserrat', sans-serif",
            },
            wrapper: {
                '.ms-Label': {
                    letterSpacing: 0,
                    color: '#000000',
                    fontSize: '20px',
                    fontWeight: 600,
                    lineHeight: '18px',
                    fontFamily: "'Montserrat', sans-serif",
                },
                '.ms-TextField-fieldGroup': [
                    {
                        height: '48px',
                        border: '1px solid #C4C4C4',
                        borderRadius: '8px',
                        '.ms-TextField-field': {
                            letterSpacing: 0,
                            color: '#999999',
                            fontSize: '20px',
                            fontWeight: 500,
                            lineHeight: '18px',
                            paddingLeft: '16px',
                            fontFamily: "'Montserrat', sans-serif",
                        },
                    },
                    required && {
                        borderTopColor: props.theme.semanticColors.errorText,
                    },
                ],
            },
        };
    }

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
    const time = [
        { text: '10 AM', key: '10 AM' },
        { text: '11 AM', key: '11 AM' },
        { text: '12 AM', key: '12 AM' },
        { text: '1 PM', key: '1 PM' },
        { text: '2 PM', key: '2 PM' },
        { text: '3 PM', key: '3 PM' },
        { text: '4 PM', key: '4 PM' },
    ];

    return (
        <Layout title=" Sweepstakes Report">
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
                Sweepstakes Report
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
                                paddingLeft: '5px',
                            }}>
                            <Label styles={labelStyles}>Store Name:&nbsp;</Label>
                            <Text styles={textStyles}> Xxxxxxxx</Text>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingLeft: '5px',
                            }}>
                            <Label styles={labelStyles}>Store Id:&nbsp;</Label>
                            <Text styles={textStyles}>XXX</Text>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingBottom: '15px',
                                paddingLeft: '5px',
                            }}>
                            <Label styles={labelStyles}>Store Credit:&nbsp;</Label>
                            <Text styles={textStyles}>$xxxxxxx</Text>
                        </div>
                    </div>
                </div>
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                            <DatePicker label="From:" placeholder="Date" styles={getDateStyles} />
                        </div>

                        <div
                            className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"
                            style={{ paddingTop: '27px' }}>
                            <Dropdown styles={dropdownStyles} placeholder="Time" options={time} />
                        </div>
                    </div>

                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                            <DatePicker label="To:" styles={getDateStyles} placeholder="Date" />
                        </div>

                        <div
                            className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"
                            style={{ paddingTop: '27px' }}>
                            <Dropdown placeholder="Time" styles={dropdownStyles} options={time} />
                        </div>
                    </div>

                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <Dropdown
                                options={[
                                    { key: 'Add Cashier', text: 'Add Cashier' },
                                    { key: 'Add Manager', text: 'Add Manager' },
                                    { key: 'View 86d Customers', text: 'View 86d Customers' },
                                ]}
                                label="Cashier:"
                                styles={dropdownStyles}
                            />
                        </div>

                        <div className="ms-Grid-col ms-sm6">
                            <Dropdown
                                options={[
                                    { key: 'Add Cashier', text: 'Add Cashier' },
                                    { key: 'Add Manager', text: 'Add Manager' },
                                    { key: 'View 86d Customers', text: 'View 86d Customers' },
                                ]}
                                label="Customer:"
                                styles={dropdownStyles}
                            />
                        </div>
                    </div>

                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <Dropdown
                                options={[
                                    { key: 'Add Cashier', text: 'Add Cashier' },
                                    { key: 'Add Manager', text: 'Add Manager' },
                                    { key: 'View 86d Customers', text: 'View 86d Customers' },
                                ]}
                                label="Sweepstakes:"
                                styles={dropdownStyles}
                            />
                        </div>

                        <div className="ms-Grid-col ms-sm6">
                            <Checkbox label="Only Prizes:" styles={checkboxStyles} />
                        </div>
                    </div>

                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <Checkbox label="Bonus Entries:" styles={checkboxStyles} />
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
                            <PrimaryButton text="Create" styles={buttonStyles} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default sweepstakesReports;
