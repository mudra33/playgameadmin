import React from 'react';
import Layout from '../../components/Layout/Pre';
import { CompoundButton, ChoiceGroup, DefaultButton, Text, Label } from '@fluentui/react';

const profile = () => {
    const buttonStylesAccept = {
        root: {
            borderRadius: '8px',
            width: '245px',
            background: '#EF3625 0% 0% no-repeat padding-box',
            opacity: 1,
            marginRight: '10px',
            display: 'inline-block',
        },
        label: {
            marginLeft: '60px',
            textAlign: 'center',
            font: 'normal normal bold 20px Montserrat',
            letterSpacing: '0.2px',
            color: '#FFFFFF',
            display: 'inline-block',
        },
        description: {
            marginLeft: '5px',
            display: 'inline-block',
            color: '#FFFFFF',
            font: 'normal normal normal 11px Montserrat',
        },
    };
    const buttonStylesDecline = {
        root: {
            borderRadius: '8px',
            width: '245px',
            background: '#2845A7 0% 0% no-repeat padding-box',
            opacity: 1,
            display: 'inline-block',
        },
        label: {
            marginLeft: '60px',
            textAlign: 'center',
            font: 'normal normal bold 20px/15px Montserrat',
            letterSpacing: '0.2px',
            color: '#FFFFFF',
            display: 'inline-block',
        },
        description: {
            marginLeft: '5px',
            display: 'inline-block',
            color: '#FFFFFF',
            font: 'normal normal normal 11px Montserrat',
        },
    };

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

    const exitButtonStyles = {
        root: {
            width: '100%',
            height: '48px',
            marginRight: '10px',
            borderRadius: '8px',
            border: '1px solid #E5E5E5',
            background: '#E5E5E5 0% 0% no-repeat padding-box',
            marginTop: '15px',
        },
        label: {
            color: '#999999',
            textAlign: 'center',
            letterSpacing: '0.2px',
            font: 'normal normal bold 20px/18px Montserrat',
        },
    };

    const options = [
        { key: 'Need to Change The Password', text: 'Need to Change The Password' },
        { key: 'Need to Edit Personal Data', text: 'Need to Edit Personal Data', disabled: true },
    ];

    return (
        <Layout title="Auth Profile">
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
                IS THIS THE ACCOUNT ?
            </h1>

            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <form
                        style={{
                            background: '#FFFFFF 0% 0% no-repeat padding-box',
                            opacity: 1,
                            padding: '50px',
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
                                    <Label styles={labelStyles}>Name:&nbsp;</Label>
                                    <Text styles={textStyles}> Xxxxx Xxxxxxx</Text>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <Label styles={labelStyles}>Phone Number:&nbsp;</Label>
                                    <Text styles={textStyles}>XXX-XXX-XXXX</Text>
                                </div>
                            </div>
                        </div>
                        <img
                            style={{
                                width: '500px',
                                height: '230px',
                                background:
                                    "transparent url('img/bg.png') 0% 0% no-repeat padding-box",
                                border: '6px solid #FFFFFF',
                                borderRadius: '4px',
                                opacity: '1',
                            }}
                            alt=""
                            src="/images/image1.png"
                        />

                        <ChoiceGroup
                            style={{
                                textAlign: 'left',
                                font: 'normal normal medium 16px/18px Montserrat',
                                letterSpacing: 0,
                                color: '#000000',
                                paddingBottom: '15px',
                                paddingTop: '20px',
                            }}
                            defaultSelectedKey="B"
                            options={options}
                            required={true}
                        />

                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6">
                                <CompoundButton secondaryText="Go Back" styles={buttonStylesAccept}>
                                    No
                                </CompoundButton>
                            </div>

                            <div className="ms-Grid-col ms-sm6">
                                <CompoundButton
                                    secondaryText="Continue"
                                    styles={buttonStylesDecline}>
                                    Yes
                                </CompoundButton>
                            </div>
                        </div>

                        <DefaultButton text="Exit" styles={exitButtonStyles} />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default profile;
