import React from 'react';
import { CompoundButton, Text, Label, DefaultButton } from '@fluentui/react';
import Layout from '../../components/Layout/Pre';
import { useRouter } from 'next/router';

const Ecard = () => {
    const router = useRouter();
    const buttonStylesAccept = {
        root: {
            borderRadius: '8px',
            width: '245px',
            background: '#EF3625 0% 0% no-repeat padding-box',
            opacity: 1,
            marginRight: '10px',
            marginBottom: '15px',
            display: 'inline-block',
        },
        label: {
            marginLeft: '70px',
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
            marginBottom: '15px',
            width: '245px',
            background: '#2845A7 0% 0% no-repeat padding-box',
            opacity: 1,
            display: 'inline-block',
        },
        label: {
            marginLeft: '50px',
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
    const exitButtonStyles = {
        root: {
            width: '100%',
            height: '48px',
            marginRight: '10px',
            marginTop: '10px',
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

    return (
        <Layout title="Auth Ecard">
            <h1
                style={{
                    textAlign: 'center',
                    font: 'normal normal bold 34px/50px Montserrat',
                    letterSpacing: '0px',
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                    opacity: 1,
                    marginBottom: '25px',
                }}>
                Enter Our Sweepstakes
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
                                        paddingBottom: '15px',
                                    }}>
                                    <Label styles={labelStyles}> Thank you,&nbsp;</Label>
                                    <Text styles={textStyles}> Xxxxx Xxxxxxx</Text>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <Label styles={labelStyles}> $XX&nbsp;</Label>
                                    <Text styles={textStyles}>Will Be Added To</Text>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <Label styles={labelStyles}> Your Phone:&nbsp;</Label>
                                    <Text styles={textStyles}> XXX-XXX-XXXX</Text>
                                </div>
                            </div>
                        </div>

                        <h2
                            style={{
                                color: '#000000',
                                font: 'normal normal 600 22px/30px Montserrat',
                                letterSpacing: 0,
                            }}>
                            WOULD YOU LIKE TO ENTER OUR FREE SWEEPSTAKES?
                        </h2>
                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm6">
                                    <CompoundButton
                                        onClick={() => router.push('/')}
                                        styles={buttonStylesAccept}>
                                        No
                                    </CompoundButton>
                                </div>

                                <div className="ms-Grid-col ms-sm6">
                                    <CompoundButton
                                        onClick={() => router.push('/auth/free-sweepstakes')}
                                        secondaryText="I want free"
                                        styles={buttonStylesDecline}>
                                        Yes
                                    </CompoundButton>
                                </div>
                            </div>
                        </div>

                        <DefaultButton
                            text="Exit"
                            onClick={() => router.back()}
                            styles={exitButtonStyles}
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Ecard;
