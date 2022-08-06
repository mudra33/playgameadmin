import React from 'react';
import Layout from '../../components/Layout/Pre';
import { Text, DefaultButton } from '@fluentui/react';
import { useRouter } from 'next/router';

const AccountExists = () => {
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
            textTransform: 'uppercase',
            font: 'normal normal bold 20px/18px Montserrat',
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
        <Layout title="Account Exists">
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
                Account Already Exists
            </h1>

            <div
                style={{
                    background: '#FFFFFF 0% 0% no-repeat padding-box',
                    opacity: 1,
                    padding: '50px',
                    width: '600px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <Text styles={labelFieldStyles}>
                    An account already exists with this data. Only one account is allowed per
                    person. Please log into your existing account, or see an agent for help
                </Text>

                <DefaultButton
                    text="Exit"
                    onClick={() => router.back()}
                    styles={exitButtonStyles}
                />
            </div>
        </Layout>
    );
};

export default AccountExists;
