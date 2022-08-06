import React from 'react';
import Layout from '../../components/Layout/Pre';
import { Text, Label, DefaultButton, CompoundButton } from '@fluentui/react';
import { useRouter } from 'next/router';

const Verification = () => {
    const router = useRouter();
    const buttonStylesAccept = {
        root: {
            borderRadius: '8px',
            width: '245px',
            background: '#EF3625 0% 0% no-repeat padding-box',
            opacity: 1,
        },
        label: {
            textAlign: 'center',
            font: 'normal normal bold 20px/15px Montserrat',
            letterSpacing: '0.2px',
            color: '#FFFFFF',
        },
        description: {
            marginLeft: '25px',
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
        },
        label: {
            textAlign: 'center',
            font: 'normal normal bold 20px/15px Montserrat',
            letterSpacing: '0.2px',
            color: '#FFFFFF',
        },
        description: {
            marginLeft: '35px',
            color: '#FFFFFF',
            font: 'normal normal normal 11px Montserrat',
        },
    };

    const exitButtonStyles = {
        root: {
            width: '100%',
            height: '48px',
            marginRight: '10px',
            marginTop: '20px',
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
        <Layout title="Auth Verification">
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
                Verification
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
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Label styles={labelStyles}>$XXX&nbsp;</Label>
                            <Text styles={textStyles}> in Long Distance Phone Time</Text>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: '15px',
                            }}>
                            <Label styles={labelStyles}> will be added To&nbsp;</Label>
                            <Text styles={textStyles}>XXX-XXX-XXXX</Text>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingBottom: '32px',
                            }}>
                            <Label styles={labelStyles}> XXX &nbsp;</Label>
                            <Text styles={textStyles}> Free Entries to Participate in Sweep 3</Text>
                        </div>
                    </div>
                </div>
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <CompoundButton
                                secondaryText="I Need To Change Something"
                                onClick={() => router.push('/auth/international-long-distance-eca')}
                                styles={buttonStylesAccept}>
                                Wait
                            </CompoundButton>
                        </div>

                        <div className="ms-Grid-col ms-sm6">
                            <CompoundButton
                                secondaryText="Complete This Purchase"
                                onClick={() => router.push('/auth/thankyou')}
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
        </Layout>
    );
};

export default Verification;
