import React from 'react';
import Layout from '../../components/Layout/Pre';
import { PrimaryButton, DefaultButton, Text } from '@fluentui/react';
import { useRouter } from 'next/router';

const Submit = () => {
    const router = useRouter();
    const buttonStyles = {
        root: {
            height: '48px',
            background: '#E5E5E5 0% 0% no-repeat padding-box',
            borderRadius: '8px',
        },
        label: {
            textAlign: 'center',
            font: 'normal normal 700 20px/15px Montserrat',
            letterSpacing: '0.2px',
            color: '#FFFFFF',
        },
    };
    const exitButtonStyles = {
        root: {
            width: '100%',
            height: '48px',
            marginRight: '10px',
            borderRadius: '8px',
            marginBottom: '20px',
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
    const labelFieldStyles = {
        root: {
            color: '#000000',
            letterSpacing: 0,
            textAlign: 'left',
            fontSize: '18px',
            lineHeight: '26px',
            font: 'normal normal medium',
            fontFamily: "'Montserrat'",
            marginBottom: '15px',
            opacity: 1,
        },
    };

    return (
        <Layout title="Auth Submit">
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
                THANK YOU FOR <br />
                YOUR ORDER!
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
                <DefaultButton text="Transaction # SXXXXX" styles={exitButtonStyles} />
                <Text styles={labelFieldStyles}>
                    Please proceed to the cashier for <br /> payment.
                </Text>

                <Text styles={labelFieldStyles}>You will receive a text when your order is complete.</Text>

                <h2
                    style={{
                        color: '#000000',
                        textAlign: 'left',
                        font: 'normal normal 600 25px/36px Montserrat',
                        letterSpacing: 0,
                        opacity: 1,
                        textTransform: 'uppercase',
                    }}>
                    All Sales Are Final
                </h2>

                <PrimaryButton text="Close" onClick={() => router.push('/')} styles={buttonStyles} />
            </form>
        </Layout>
    );
};

export default Submit;
