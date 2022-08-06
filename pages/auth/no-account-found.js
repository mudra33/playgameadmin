import React from 'react';
import Layout from '../../components/Layout/Pre';
import { PrimaryButton, Text, DefaultButton } from '@fluentui/react';
import { useRouter } from 'next/router';

const noAccount = () => {
    const router = useRouter();
    const buttonStylesAccept = {
        root: {
            height: '48px',
            borderRadius: '8px',
            width: '245px',
            background: '#EF3625 0% 0% no-repeat padding-box',
            opacity: 1,
            marginRight: '10px',
            marginTop: '20px',
        },
        label: {
            textAlign: 'center',
            font: 'normal normal bold 20px/15px Montserrat',
            letterSpacing: '0.2px',
            color: '#FFFFFF',
        },
    };

    const buttonStylesDecline = {
        root: {
            height: '48px',
            borderRadius: '8px',
            width: '245px',
            background: '#2845A7 0% 0% no-repeat padding-box',
            opacity: 1,
            marginTop: '20px',
        },
        label: {
            textAlign: 'center',
            font: 'normal normal bold 20px/15px Montserrat',
            letterSpacing: '0.2px',
            color: '#FFFFFF',
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
        <Layout title="No Account Found">
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
                No Account Found
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
                <Text styles={textStyles}> Would You Like To Create A New Account?</Text>

                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <PrimaryButton
                                text="No"
                                onClick={() => router.push('/')}
                                styles={buttonStylesAccept}
                            />
                        </div>

                        <div className="ms-Grid-col ms-sm6">
                            <PrimaryButton
                                text="Yes"
                                onClick={() => router.push('/auth/signup')}
                                styles={buttonStylesDecline}
                            />
                        </div>
                    </div>
                </div>

                <DefaultButton
                    text="Exit"
                    onClick={() => router.back()}
                    styles={exitButtonStyles}
                />
            </form>
        </Layout>
    );
};

export default noAccount;
