import React from 'react';
import Layout from '../../components/Layout/Pre';
import { Text, DefaultButton, Label, CompoundButton, FontIcon, mergeStyles } from '@fluentui/react';
import { useRouter } from 'next/router';

const viewAgent = () => {
    const router = useRouter();
    const exitButtonStyles = {
        root: {
            width: '100%',
            height: '48px',
            marginRight: '10px',
            borderRadius: '8px',
            marginTop: '20px',
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

    const iconClass = mergeStyles({
        fontSize: 30,
        height: 30,
        width: 35,
        margin: '0 25px',
        opacity: 0.81,
    });

    const compoundButtonStyles = {
        root: {
            width: '100%',
            height: '125px',
            marginRight: '10px',
            borderRadius: '8px',
            border: '1px dashed #C4C4C4',
            background: '#F4F4F4 0% 0% no-repeat padding-box',
            marginLeft: '105px',
        },
        flexContainer: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
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
            marginBottom: '15px',
            opacity: 1,
        },
    };

    return (
        <Layout title="Auth View Agent">
            <h1
                style={{
                    color: '#FFFFFF',
                    textAlign: 'center',
                    font: 'normal normal 700 34px/50px Montserrat',
                    letterSpacing: 0,
                    textTransform: 'uppercase',
                    opacity: 1,
                    marginBottom: '30px',
                }}>
                Please see An Agent
            </h1>

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
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Label styles={labelStyles}>Name:&nbsp;</Label>
                            <Text styles={textStyles}>Xxxxx Xxxxxxxx</Text>
                        </div>

                        <div
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Label styles={labelStyles}>Phone Number:&nbsp;</Label>
                            <Text styles={textStyles}>XXX-XXX-XXXX</Text>
                        </div>
                    </div>
                </div>

                <Text styles={labelFieldStyles}>
                    An agent will need to verify your identity before your request is processed.
                </Text>

                <CompoundButton styles={compoundButtonStyles}>
                    <FontIcon
                        aria-label="TextDocument"
                        iconName="TextDocument"
                        className={iconClass}
                    />
                    <span
                        style={{
                            color: '#333333',
                            letterSpacing: 0,
                            paddingTop: '8px',
                            textAlign: 'center',
                            fontSize: '15px',
                            fontFamily: 'Montserrat',
                            fontWeight: 'medium',
                        }}>
                        Upload ID Image
                    </span>
                    <span
                        style={{
                            textAlign: 'center',
                            fontSize: '9px',
                            fontFamily: 'Montserrat',
                            fontWeight: 'medium',
                            letterSpacing: 0,
                            color: '#999999',
                        }}>
                        Tap to upload or take a photo
                    </span>
                </CompoundButton>

                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col  ms-sm6 ms-md6 ms-lg6">
                            <DefaultButton
                                text="Continue"
                                onClick={() => router.push('/auth/thankyou')}
                                styles={exitButtonStyles}
                            />
                        </div>
                        <div className="ms-Grid-col  ms-sm6 ms-md6 ms-lg6">
                            <DefaultButton
                                text="Exit"
                                onClick={() => router.push('/')}
                                styles={exitButtonStyles}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    );
};

export default viewAgent;
