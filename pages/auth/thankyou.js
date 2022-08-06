import React from 'react';
import Layout from '../../components/Layout/Pre';
import { Text, DefaultButton, Label } from '@fluentui/react';
import { useRouter } from 'next/router';

const Thankyou = () => {
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
        <Layout title="Auth Thankyou">
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
                Thank you !
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
                <DefaultButton text="Transaction #XXXXXX" styles={exitButtonStyles} />

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

                <h2
                    style={{
                        color: '#000000',
                        textAlign: 'left',
                        font: 'normal normal 600 22px/36px Montserrat',
                        letterSpacing: 0,
                        opacity: 1,
                        textDecoration: 'underline',
                    }}>
                    Please See An Agent For Approval
                </h2>
                <Text styles={labelFieldStyles}>
                    After approval, your request will be processed and you will receive a text when
                    it has been completed. Please allow up to 30 minutes for the process to
                    complete.
                </Text>

                <DefaultButton
                    text="Exit"
                    onClick={() => router.back()}
                    styles={exitButtonStyles}
                />
            </form>
        </Layout>
    );
};

export default Thankyou;
